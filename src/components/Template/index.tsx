import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

// Reusable Tag Component
const Tag = ({ category }) => {
  const colorMap = {
    Email: 'bg-blue-100 text-blue-800',
    Documentation: 'bg-green-100 text-green-800',
    Business: 'bg-purple-100 text-purple-800',
    // Add more categories and colors as needed
  };

  const colorClass = colorMap[category] || 'bg-gray-100 text-gray-800'; // Default color for unknown categories

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
      {category}
    </span>
  );
};

function TemplateManagement() {
  const [templates, setTemplates] = useState([
    { id: 1, title: 'Welcome Email', category: 'Email', lastModified: '2024-01-05' },
    { id: 2, title: 'Meeting Minutes', category: 'Documentation', lastModified: '2024-01-04' },
    { id: 3, title: 'Project Proposal', category: 'Business', lastModified: '2024-01-03' }
  ]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const handleCreate = () => {
    navigate('/template/builder');
  };

  const handleDelete = (e, template) => {
    e.stopPropagation();
    setSelectedTemplate(template);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    setTemplates(templates.filter(template => template.id !== selectedTemplate.id));
    setShowDeleteDialog(false);
    setSelectedTemplate(null);
  };

  const handleRowClick = (id) => {
    navigate('/template/builder');
  };

  const handleEdit = (e, template) => {
    e.stopPropagation();
    setSelectedTemplate(template);
    setEditTitle(template.title);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    setTemplates(templates.map(template => 
      template.id === selectedTemplate.id 
        ? { 
            ...template, 
            title: editTitle,
            lastModified: new Date().toISOString().split('T')[0]
          } 
        : template
    ));
    setShowEditModal(false);
    setSelectedTemplate(null);
    setEditTitle('');
  };

  const filteredTemplates = templates.filter(template =>
    template.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Templates</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors text-sm"
        >
          <Plus className="h-4 w-4" />
          Create Template
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-4 bg-white p-3 rounded-lg shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
      </div>

      {/* Templates Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <Table className="text-sm">
          <TableHeader>
            <TableRow className="">
              <TableHead className="px-4 py-2">Title</TableHead>
              <TableHead className="px-4 py-2">Category</TableHead>
              <TableHead className="px-4 py-2">Last Modified</TableHead>
              <TableHead className="px-4 py-2">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTemplates.map((template) => (
              <TableRow
                key={template.id}
                onClick={() => handleRowClick(template.id)}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="px-4 py-2 font-medium">{template.title}</TableCell>
                <TableCell className="px-4 py-2">
                  <Tag category={template.category} />
                </TableCell>
                <TableCell className="px-4 py-2">{template.lastModified}</TableCell>
                <TableCell className="px-4 py-2">
                  <div className="flex gap-2">
                    <button
                      className="text-gray-400 hover:text-blue-600"
                      onClick={(e) => handleEdit(e, template)}
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      className="text-gray-400 hover:text-red-600"
                      onClick={(e) => handleDelete(e, template)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-6">
            <p className="text-gray-500 text-sm">No templates found</p>
            <p className="text-gray-400 text-xs mt-1">
              {searchTerm ? "Try adjusting your search" : "Create your first template to get started"}
            </p>
          </div>
        )}
      </div>

      {/* Create Template Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Create New Template</h2>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Template Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Template</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Template Name
              </label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedTemplate(null);
                  setEditTitle('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                disabled={!editTitle.trim()}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Template</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedTemplate?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setShowDeleteDialog(false);
              setSelectedTemplate(null);
            }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default TemplateManagement;