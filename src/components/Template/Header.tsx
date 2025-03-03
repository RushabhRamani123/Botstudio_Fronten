import { Layout, Mail } from 'lucide-react'
function Header({templateType,handleTemplateTypeChange,handleSave}) {
  return (
    <div>
        <header className="border-b-2 border-blue-300 bg-white">
        <div className="flex h-16 items-center px-4 justify-between">
          <h2 className="text-lg font-semibold">Template Builder</h2>
          <div className="flex gap-4">
            <button
              className={`px-4 py-2 rounded-md text-sm ${
                templateType === "email"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => handleTemplateTypeChange("email")}
            >
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Template
              </div>
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm ${
                templateType === "marketing"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => handleTemplateTypeChange("marketing")}
            >
              <div className="flex items-center gap-2">
                <Layout className="h-4 w-4" />
                Marketing Template
              </div>
            </button>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-md text-sm"
              onClick={handleSave}
            >
              Save Template
            </button>
          </div>
        </div>
      </header>
    </div>
  )
}
export default Header;