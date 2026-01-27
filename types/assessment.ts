export interface SubDimension {
  name: string;
  icon: string;
  userScore: number;
  partnerScore: number;
}

export interface Dimension {
  id: string;
  name: string;
  description: string;
  icon: string;
  userScore: number;
  partnerScore: number;
  maxScore?: number;
  warningText: string;
  subDimensions: SubDimension[];
}

export interface AssessmentResult {
  overallScore: number;
  partnerOverallScore: number;
  assessmentDate: string;
  dimensions: Dimension[];
}
