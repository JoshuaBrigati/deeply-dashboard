export interface SubDimension {
  name: string;
  icon: string;
  userScore: number;
  partnerScore: number;
}

export interface Dimension {
  id: number;
  name: string;
  description: string;
  icon: string;
  userScore: number;
  partnerScore: number;
  maxScore?: number;
  warningText: string;
  subDimensions: SubDimension[];
}

export interface AssessmentData {
  overallScore: number;
  maxScore: number;
  assessmentDate: string;
  coupleNames: { user: string; partner: string };
  dimensions: Dimension[];
}
