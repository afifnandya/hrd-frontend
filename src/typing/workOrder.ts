import { Departmen, Divisi, Posisi } from '@/typing/dataMaster'

export interface WorkOrder {
  id: number
  code: string
  status: string
  department: {
    id: number
    name: string
  }
  division: {
    id: number
    name: string
  }
  position: {
    id: number
    name: string
  }
  requesterName: string
  requestDate: string
  expireDate: string
  estimateWorkingDate: string
  existingPositionCount: number
  neededPositionCount: number
  hiringType: string
  requestedSalary: number
  requestedAge: number
  requestedGender: string
  requestedMaritalStatus: string
  requestedTall: string
  requestedPyhsical: string
  requestedVision: string
  requestedEducationStage: string
  requestedEducationMajor: string
  requestedCertification: string
  requestedExperiences: string
  requestedComputerSkill: string
  requestedMultiLanguage: string
  requestedMultiLevel: string
  requestedNationality: string
  requestedResidence: string
  reason: string
  jobDescription: string
  otherRequest: string
  receiverName: string
  receiveDate: string
}
