export type Links = {
  path: string | null
  first: string | null
  last: string | null
  prev: string | null
  next: string | null
}

export type Meta = {
  from: number | null
  to: number | null
  perPage: number | null
  currentPage: number | null
  lastPage: number | null
  total: number | null
}

export interface KaryawanAttribute {
  id: number
  nik: string
  name: string
  activeStatus: string
  departmentId: number
  grade: string
  positionLevel: string
  level: string
  taxDependentStatus: string
  maritalStatus: null | string
  kk: string
  kkUpdatedAt: null
  gender: string
  birthPlace: string
  birthDate: string
  religion: string
  city: string
  district: string
  address: string
  pohOrigin: string
  pohOriginKtp: string
  pohWorking: string
  pohCategory: string
  phone: string
  phoneEmergency: string
  ktp: string
  sim: string
  npwp: string
  bpjsKesehatan: string
  bpjsKetenagakerjaan: string
  company: {
    id: number
    code: string
    name: string
  }
  area: {
    code: string
    area: string
  }
  division: {
    id: number
    name: string
  }
  position: {
    id: number
    name: string
  }
  families: {
    id: number
    name: string
    relationship: string
    gender: string | null
    birthPlace: null | string
    birthDate: null | string
    ktp: null | string
    job: null
  }[]
  bankAccount?: {
    id: number
    bankName: string
    accountNumber: string
    accountName: string
  }
  education: {
    id: number
    stage: string
    major: string
  }
  employmentContracts: {
    id: number
    companyId: number
    areaCode: string
    divisionId: number
    positionId: number
    contractType: string
    grade: string
    positionLevel: string
    level: string
    duration: number | null
    startDate: null
    endDate: null
  }[]
  meta: Meta
  links: Links
}

export interface GetKaryawan {
  status: number
  message: string
  data: KaryawanAttribute[]
  meta: Meta
  links: Links
}
