interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiEntity {
  id: number;
  attributes: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

class StrapiAPI {
  private baseURL: string;

  constructor(baseURL = "http://localhost:1337") {
    this.baseURL = baseURL;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}/api${endpoint}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Menu Categories
  async getMenuCategories(): Promise<StrapiResponse<StrapiEntity[]>> {
    return this.request("/menu-categories?populate=*");
  }

  async createMenuCategory(data: any): Promise<StrapiResponse<StrapiEntity>> {
    return this.request("/menu-categories", {
      method: "POST",
      body: JSON.stringify({ data }),
    });
  }

  async updateMenuCategory(id: number, data: any): Promise<StrapiResponse<StrapiEntity>> {
    return this.request(`/menu-categories/${id}`, {
      method: "PUT",
      body: JSON.stringify({ data }),
    });
  }

  async deleteMenuCategory(id: number): Promise<void> {
    return this.request(`/menu-categories/${id}`, {
      method: "DELETE",
    });
  }

  // Dishes
  async getDishes(): Promise<StrapiResponse<StrapiEntity[]>> {
    return this.request("/dishes?populate=*");
  }

  async createDish(data: any): Promise<StrapiResponse<StrapiEntity>> {
    return this.request("/dishes", {
      method: "POST",
      body: JSON.stringify({ data }),
    });
  }

  async updateDish(id: number, data: any): Promise<StrapiResponse<StrapiEntity>> {
    return this.request(`/dishes/${id}`, {
      method: "PUT",
      body: JSON.stringify({ data }),
    });
  }

  async deleteDish(id: number): Promise<void> {
    return this.request(`/dishes/${id}`, {
      method: "DELETE",
    });
  }

  // Activities
  async getActivities(): Promise<StrapiResponse<StrapiEntity[]>> {
    return this.request("/activities?populate=*&sort=date:asc");
  }

  async createActivity(data: any): Promise<StrapiResponse<StrapiEntity>> {
    return this.request("/activities", {
      method: "POST",
      body: JSON.stringify({ data }),
    });
  }

  async updateActivity(id: number, data: any): Promise<StrapiResponse<StrapiEntity>> {
    return this.request(`/activities/${id}`, {
      method: "PUT",
      body: JSON.stringify({ data }),
    });
  }

  async deleteActivity(id: number): Promise<void> {
    return this.request(`/activities/${id}`, {
      method: "DELETE",
    });
  }

  // Reservations
  async getReservations(): Promise<StrapiResponse<StrapiEntity[]>> {
    return this.request("/reservations?populate=*&sort=date:asc");
  }

  async createReservation(data: any): Promise<StrapiResponse<StrapiEntity>> {
    return this.request("/reservations", {
      method: "POST",
      body: JSON.stringify({ data }),
    });
  }

  async updateReservation(id: number, data: any): Promise<StrapiResponse<StrapiEntity>> {
    return this.request(`/reservations/${id}`, {
      method: "PUT",
      body: JSON.stringify({ data }),
    });
  }

  async deleteReservation(id: number): Promise<void> {
    return this.request(`/reservations/${id}`, {
      method: "DELETE",
    });
  }

  // Check table availability
  async checkTableAvailability(date: string, time: string): Promise<{ available: number; total: number }> {
    const reservations = await this.getReservations();

    // Filter reservations for the specific date and time
    const conflictingReservations = reservations.data.filter((reservation) => {
      const reservationDate = reservation.attributes.date;
      const reservationTime = reservation.attributes.time;
      return reservationDate === date && reservationTime === time;
    });

    const occupiedTables = conflictingReservations.length;
    const totalTables = 20;
    const availableTables = totalTables - occupiedTables;

    return {
      available: Math.max(0, availableTables),
      total: totalTables,
    };
  }
}

export const strapiAPI = new StrapiAPI();
export type { StrapiResponse, StrapiEntity };
