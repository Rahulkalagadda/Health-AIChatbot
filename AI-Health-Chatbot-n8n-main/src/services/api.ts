import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

export const chatService = {
  async sendMessage(message: string, userId: string = "user_123", language: string = "English") {
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, message, language })
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Chat API Error:", error);
      toast.error("Connection error. Is the Seva backend running?");
      throw error;
    }
  }
};

export const analysisService = {
  async analyzeReport(file: File, userId: string = "user_123") {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', userId);

      const response = await fetch(`${API_BASE_URL}/analysis`, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Analysis API Error:", error);
      toast.error("Error analyzing report. Please try again.");
      throw error;
    }
  },
  async chatWithReport(question: string, reportContext: string, userId: string = "user_123") {
    try {
      const response = await fetch(`${API_BASE_URL}/analysis/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, question, reportContext })
      });
      if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("Report Chat error:", error);
      toast.error("Failed to get answer about report.");
      throw error;
    }
  },
  async getReports(userId: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/reports/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch reports");
      return await response.json();
    } catch (error) {
      console.error("Reports Fetch Error:", error);
      return { reports: [] };
    }
  }
};

export const schemesService = {
  async getSchemes(query: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/schemes?query=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error("Failed to fetch schemes");
      return await response.json();
    } catch (error) {
      console.error("Schemes API Error:", error);
      return { schemes: [] };
    }
  },
  async checkEligibility(data: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/schemes/eligibility`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error("Failed to check eligibility");
      return await response.json();
    } catch (error) {
      console.error("Eligibility API Error:", error);
      return { eligible_schemes: [] };
    }
  },
  async checkPMJAYStatus(id_number: string, id_type: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/pmjay/check-status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_number, id_type })
      });
      if (!response.ok) throw new Error("Failed to check PMJAY status");
      return await response.json();
    } catch (error) {
      console.error("PMJAY Status API Error:", error);
      throw error;
    }
  }
};

export const alertsService = {
  async getAlerts(district: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/alerts?district=${encodeURIComponent(district)}`);
      if (!response.ok) throw new Error("Failed to fetch alerts");
      return await response.json();
    } catch (error) {
      console.error("Alerts API Error:", error);
      return { alerts: [] };
    }
  }
};

export const searchService = {
  async globalSearch(query: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error("Search failed");
      return await response.json();
    } catch (error) {
      console.error("Search API Error:", error);
      return { providers: [], terms: [], schemes: [] };
    }
  }
};

export const profileService = {
  async getProfile(userId: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch profile");
      return await response.json();
    } catch (error) {
      console.error("Profile API Error:", error);
      return null;
    }
  },
  async updateProfile(userId: string, data: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error("Failed to update profile");
      return await response.json();
    } catch (error) {
      console.error("Profile Update Error:", error);
      toast.error("Could not save profile changes.");
      throw error;
    }
  }
};

export const appointmentService = {
  async bookAppointment(userId: string, data: any) {
    try {
      // Map frontend camelCase to backend snake_case
      const backendData = {
        userId: userId,
        patient_name: data.patientName,
        facility_name: data.specialty, // Map specialty to facility_name as per backend
        appointment_date: data.date,
        phone_number: data.phone,
        symptoms: data.symptoms
      };

      const response = await fetch(`${API_BASE_URL}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(backendData)
      });
      if (!response.ok) throw new Error("Failed to book appointment");
      return await response.json();
    } catch (error) {
      console.error("Appointment API Error:", error);
      toast.error("Failed to secure appointment on server.");
      throw error;
    }
  },
  async getAppointments(userId: string) {
     try {
      const response = await fetch(`${API_BASE_URL}/appointments/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch appointments");
      return await response.json();
    } catch (error) {
      console.error("Appointments List Error:", error);
      return { appointments: [] };
    }
  }
};

export const translationService = {
  async translate(text: string, target_language: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/translate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, target_language })
      });
      if (!response.ok) throw new Error("Translation failed");
      return await response.json();
    } catch (error) {
      console.error("Translation API Error:", error);
      return { translated_text: text };
    }
  }
};

export const authService = {
  async login(credentials: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Login failed");
      }
      
      return await response.json();
    } catch (error) {
      console.error("Login API Error:", error);
      throw error;
    }
  },
  async signup(data: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Signup failed");
      }
      
      return await response.json();
    } catch (error) {
      console.error("Signup API Error:", error);
      throw error;
    }
  }
};
