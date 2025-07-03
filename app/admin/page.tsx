"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Users, TrendingUp, DollarSign, Eye, UserX } from "lucide-react";

interface User {
  id: string;
  username: string;
  role: "medewerker" | "beheerder";
}

interface Stats {
  visitors: number;
  occupiedTables: number;
  cancellations: number;
  revenue: number;
}

// Mock data
const mockStats: Stats = {
  visitors: 1250,
  occupiedTables: 18,
  cancellations: 5,
  revenue: 15750,
};

const mockChartData = [
  { name: "Ma", visitors: 120, revenue: 1200 },
  { name: "Di", visitors: 150, revenue: 1500 },
  { name: "Wo", visitors: 180, revenue: 1800 },
  { name: "Do", visitors: 200, revenue: 2000 },
  { name: "Vr", visitors: 250, revenue: 2500 },
  { name: "Za", visitors: 300, revenue: 3000 },
  { name: "Zo", visitors: 220, revenue: 2200 },
];

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [stats, setStats] = useState<Stats>(mockStats);
  const [dateFilter, setDateFilter] = useState("week");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Mock authentication
    if (loginForm.username === "admin" && loginForm.password === "admin123") {
      setUser({ id: "1", username: "admin", role: "beheerder" });
      setIsLoggedIn(true);
    } else if (loginForm.username === "medewerker" && loginForm.password === "medewerker123") {
      setUser({ id: "2", username: "medewerker", role: "medewerker" });
      setIsLoggedIn(true);
    } else {
      alert("Ongeldige inloggegevens");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setLoginForm({ username: "", password: "" });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-gold/10 to-brand-orange/10 flex items-center justify-center">
        <Card className="w-full max-w-md border-2 border-brand-gold/20 shadow-xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-gold to-brand-orange rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">NP</span>
            </div>
            <CardTitle className="text-brand-brown">Admin Login</CardTitle>
            <CardDescription>Log in om toegang te krijgen tot het admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username" className="text-brand-brown">
                  Gebruikersnaam
                </Label>
                <Input
                  id="username"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  className="border-brand-gold/30 focus:border-brand-orange"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-brand-brown">
                  Wachtwoord
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="border-brand-gold/30 focus:border-brand-orange"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-brand-orange hover:bg-brand-red text-white font-semibold">
                Inloggen
              </Button>
            </form>
            <div className="mt-4 text-sm text-gray-600 bg-brand-gold/5 p-3 rounded-md">
              <p className="font-semibold text-brand-brown mb-1">Demo accounts:</p>
              <p>Beheerder: admin / admin123</p>
              <p>Medewerker: medewerker / medewerker123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-brand-gold/5 via-white to-brand-orange/5">
        <div className="bg-white shadow-sm border-b-2 border-brand-gold">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-2xl font-bold text-brand-brown">Admin Panel</h1>
              <div className="flex items-center gap-4">
                <Badge
                  className={user?.role === "beheerder" ? "bg-brand-orange text-white" : "bg-brand-gold text-white"}
                >
                  {user?.role === "beheerder" ? "Beheerder" : "Medewerker"}
                </Badge>
                <span className="text-brand-brown">Welkom, {user?.username}</span>
                <Button
                  variant="outline"
                  className="border-brand-gold text-brand-brown hover:bg-brand-gold hover:text-white"
                  onClick={handleLogout}
                >
                  Uitloggen
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs defaultValue="statistics" className="w-full">
            {user?.role === "beheerder" && (
              <TabsList className="grid w-full grid-cols-2 bg-white border-2 border-brand-gold/20">
                <TabsTrigger
                  value="statistics"
                  className="data-[state=active]:bg-brand-gold data-[state=active]:text-white"
                >
                  Statistieken
                </TabsTrigger>
                <TabsTrigger
                  value="management"
                  className="data-[state=active]:bg-brand-gold data-[state=active]:text-white"
                >
                  Beheer
                </TabsTrigger>
              </TabsList>
            )}

            <TabsContent value="statistics" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-brand-brown">Statistieken</h2>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-48 border-brand-gold/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Vandaag</SelectItem>
                    <SelectItem value="week">Deze week</SelectItem>
                    <SelectItem value="month">Deze maand</SelectItem>
                    <SelectItem value="year">Dit jaar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-brand-brown">Bezoekers</CardTitle>
                    <Eye className="h-4 w-4 text-brand-orange" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-brand-brown">{stats.visitors}</div>
                    <p className="text-xs text-green-600">+12% t.o.v. vorige periode</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-brand-brown">Bezette Tafels</CardTitle>
                    <Users className="h-4 w-4 text-brand-orange" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-brand-brown">{stats.occupiedTables}/20</div>
                    <p className="text-xs text-brand-gold-dark">90% bezettingsgraad</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-brand-brown">Annuleringen</CardTitle>
                    <UserX className="h-4 w-4 text-brand-orange" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-brand-brown">{stats.cancellations}</div>
                    <p className="text-xs text-green-600">-2% t.o.v. vorige periode</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-brand-brown">Omzet</CardTitle>
                    <DollarSign className="h-4 w-4 text-brand-orange" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-brand-brown">€{stats.revenue.toLocaleString()}</div>
                    <p className="text-xs text-green-600">+8% t.o.v. vorige periode</p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-2 border-brand-gold/20">
                  <CardHeader>
                    <CardTitle className="text-brand-brown">Bezoekers per dag</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={mockChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="visitors" fill="#D9580D" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-brand-brown">Omzet per dag</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={mockChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="revenue" stroke="#D9580D" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end">
                <Button className="bg-brand-orange hover:bg-brand-red text-white font-semibold">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Download PDF Rapport
                </Button>
              </div>
            </TabsContent>

            {user?.role === "beheerder" && (
              <TabsContent value="management" className="space-y-6">
                <h2 className="text-2xl font-bold text-brand-brown">Beheer</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-brand-brown">Menu Categorieën</CardTitle>
                      <CardDescription>Beheer menu categorieën</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-brand-orange hover:bg-brand-red text-white">
                        Categorieën Beheren
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-brand-brown">Gerechten</CardTitle>
                      <CardDescription>Toevoegen, bewerken en verwijderen van gerechten</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-brand-orange hover:bg-brand-red text-white">
                        Gerechten Beheren
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-brand-brown">Activiteiten</CardTitle>
                      <CardDescription>Beheer activiteiten</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-brand-orange hover:bg-brand-red text-white">
                        Activiteiten Beheren
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
