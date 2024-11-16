export interface Projects {
  subProjects: Number[];
  id: number;
  title: string;
  category: string;
  tasks: subProjects[];
  status: string;
  date: string;
  description: string;
}

export interface subProjects {
  id: number;
  porojectId: number;
  title: string;
  performers: any[];
  date: string;
  status: boolean;
  status_mess: string;
  description: string;
  refetch: () => void;
  onRefetch: () => void;
}
