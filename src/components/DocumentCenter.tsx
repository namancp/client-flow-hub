
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FileIcon, FileTextIcon, ImageIcon, UploadIcon, DownloadIcon, EyeIcon, TrashIcon, SearchIcon, FilterIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'doc' | 'xls' | 'other';
  size: string;
  uploadedAt: string;
  category: 'tax' | 'investment' | 'insurance' | 'loan' | 'other';
  shared: boolean;
}

const mockDocuments: Document[] = [
  { id: '1', name: '2023_Tax_Return.pdf', type: 'pdf', size: '3.2 MB', uploadedAt: '2023-04-18', category: 'tax', shared: true },
  { id: '2', name: 'Investment_Statement_Q1.pdf', type: 'pdf', size: '1.8 MB', uploadedAt: '2023-04-01', category: 'investment', shared: false },
  { id: '3', name: 'Life_Insurance_Policy.pdf', type: 'pdf', size: '4.5 MB', uploadedAt: '2023-03-15', category: 'insurance', shared: true },
  { id: '4', name: 'Mortgage_Agreement.pdf', type: 'pdf', size: '2.9 MB', uploadedAt: '2023-02-28', category: 'loan', shared: false },
  { id: '5', name: 'Property_Photo.jpg', type: 'image', size: '1.2 MB', uploadedAt: '2023-02-10', category: 'other', shared: false },
  { id: '6', name: 'Budget_Spreadsheet.xls', type: 'xls', size: '0.8 MB', uploadedAt: '2023-01-20', category: 'other', shared: true },
];

export const DocumentCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredDocuments = mockDocuments
    .filter(doc => doc.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(doc => activeCategory === 'all' || doc.category === activeCategory);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const getFileIcon = (type: Document['type']) => {
    switch (type) {
      case 'pdf':
        return <FileTextIcon className="h-5 w-5 text-red-500" />;
      case 'image':
        return <ImageIcon className="h-5 w-5 text-blue-500" />;
      case 'doc':
        return <FileTextIcon className="h-5 w-5 text-blue-700" />;
      case 'xls':
        return <FileTextIcon className="h-5 w-5 text-green-600" />;
      default:
        return <FileIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getCategoryColor = (category: Document['category']) => {
    switch (category) {
      case 'tax':
        return 'bg-orange-50 text-orange-700';
      case 'investment':
        return 'bg-purple-50 text-purple-700';
      case 'insurance':
        return 'bg-blue-50 text-blue-700';
      case 'loan':
        return 'bg-red-50 text-red-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Document Center</h2>
          <p className="text-muted-foreground">Upload, manage, and share important documents</p>
        </div>
        <Button className="gap-2">
          <UploadIcon className="h-4 w-4" />
          <span>Upload</span>
        </Button>
      </div>

      <Card className="border shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <CardTitle>Documents</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search documents..." 
                  className="pl-10 h-9"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <FilterIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-6 mb-2">
              <TabsTrigger value="all" onClick={() => setActiveCategory('all')}>All</TabsTrigger>
              <TabsTrigger value="tax" onClick={() => setActiveCategory('tax')}>Tax</TabsTrigger>
              <TabsTrigger value="investment" onClick={() => setActiveCategory('investment')}>Investment</TabsTrigger>
              <TabsTrigger value="insurance" onClick={() => setActiveCategory('insurance')}>Insurance</TabsTrigger>
              <TabsTrigger value="loan" onClick={() => setActiveCategory('loan')}>Loan</TabsTrigger>
              <TabsTrigger value="other" onClick={() => setActiveCategory('other')}>Other</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                  <tr>
                    <th scope="col" className="px-6 py-3">Name</th>
                    <th scope="col" className="px-6 py-3">Category</th>
                    <th scope="col" className="px-6 py-3">Date Uploaded</th>
                    <th scope="col" className="px-6 py-3">Size</th>
                    <th scope="col" className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDocuments.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground">
                        No documents found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredDocuments.map((doc) => (
                      <tr key={doc.id} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 font-medium flex items-center gap-2">
                          {getFileIcon(doc.type)}
                          <span>{doc.name}</span>
                          {doc.shared && (
                            <Badge variant="outline" className="ml-2 text-xs">Shared</Badge>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={cn("font-medium", getCategoryColor(doc.category))}>
                            {doc.category.charAt(0).toUpperCase() + doc.category.slice(1)}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {new Date(doc.uploadedAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{doc.size}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <EyeIcon className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <DownloadIcon className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
