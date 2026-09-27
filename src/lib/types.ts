export type ProjectConfigType = {
  id: string;
  name: string;
  localPath: string;      // Where the folder is on your computer
  startCommand: string;   // How to boot it (e.g., 'npm run dev')
  port: number;           // The port it runs on
  productionUrl?: string;  // Fallback URL for the future
  themeColor: string;     // Color for the 3D portal or 2D card
};
