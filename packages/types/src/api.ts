export interface CreateCandidateRequest {
  name: string;
  email: string;
  phone: string;
  address: string;
  education: string;
  experience: string;
  skills: string[];
  resume: string;
}

export interface CreateCandidateResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  education: string;
  experience: string;
  skills: string[];
  resume: string;
}

export interface UpdateCandidateRequest {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  education?: string;
  experience?: string;
  skills?: string[];
  resume?: string;
}

export interface UpdateCandidateResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  education: string;
  experience: string;
  skills: string[];
  resume: string;
}

export interface GetCandidateResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  education: string;
  experience: string;
  skills: string[];
  resume: string;
}

export interface DeleteCandidateResponse {
  id: string;
}
