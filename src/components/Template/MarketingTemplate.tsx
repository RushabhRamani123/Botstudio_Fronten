import { useState } from "react";
import { PlusCircle, X } from "lucide-react";

export const RenderMarketingFields = ({ handleChange, template }) => {
  const [showVariableModal, setShowVariableModal] = useState(false);
  const [selectedField, setSelectedField] = useState("");
  const [variables, setVariables] = useState([
    { name: "customerName", description: "Customer's full name" },
    { name: "companyName", description: "Company name" },
    { name: "productName", description: "Product name" },
    { name: "date", description: "Current date" },
  ]);
  const [newVariable, setNewVariable] = useState({ name: "", description: "" });
  const insertVariable = (field, variableName) => {
    const cursorPosition = document.querySelector(
      `[name="${field}"]`
    ).selectionStart;
    const currentValue = template[field];
    const newValue =
      currentValue.slice(0, cursorPosition) +
      `{{${variableName}}}` +
      currentValue.slice(cursorPosition);

    handleChange({
      target: {
        name: field,
        value: newValue,
      },
    });
  };
  const addNewVariable = () => {
    if (newVariable.name && newVariable.description) {
      setVariables([...variables, newVariable]);
      setNewVariable({ name: "", description: "" });
    }
  };
  const VariableSelector = ({ field }) => (
    <div className="relative">
      <button
        type="button"
        onClick={() => {
          setSelectedField(field);
          setShowVariableModal(true);
        }}
        className="absolute right-2 top-2 text-gray-500 hover:text-blue-600"
      >
        <PlusCircle className="h-5 w-5" />
      </button>
    </div>
  );
  const VariableModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Insert Variable</h3>
          <button
            onClick={() => setShowVariableModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-4 p-4 bg-gray-50 rounded-md">
          <h4 className="text-sm font-medium mb-2">Add New Variable</h4>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Variable name"
              value={newVariable.name}
              onChange={(e) =>
                setNewVariable({ ...newVariable, name: e.target.value })
              }
              className="w-full p-2 border rounded-md text-sm"
            />
            <input
              type="text"
              placeholder="Variable description"
              value={newVariable.description}
              onChange={(e) =>
                setNewVariable({ ...newVariable, description: e.target.value })
              }
              className="w-full p-2 border rounded-md text-sm"
            />
            <button
              onClick={addNewVariable}
              className="w-full p-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
            >
              Add Variable
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {variables.map((variable) => (
            <button
              key={variable.name}
              onClick={() => {
                insertVariable(selectedField, variable.name);
                setShowVariableModal(false);
              }}
              className="w-full p-3 text-left border rounded-md hover:bg-gray-50"
            >
              <div className="text-sm font-medium">{variable.name}</div>
              <div className="text-xs text-gray-500">
                {variable.description}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Target Audience
        </label>
        <div className="relative">
          <input
            type="text"
            name="targetAudience"
            placeholder="Define your target audience..."
            value={template.targetAudience}
            onChange={handleChange}
            className="w-full p-2 border rounded-md pr-10"
          />
          <VariableSelector field="targetAudience" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Campaign Goals
        </label>
        <div className="relative">
          <input
            type="text"
            name="campaignGoals"
            placeholder="Enter campaign goals..."
            value={template.campaignGoals}
            onChange={handleChange}
            className="w-full p-2 border rounded-md pr-10"
          />
          <VariableSelector field="campaignGoals" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Key Messages
        </label>
        <div className="relative">
          <textarea
            name="keyMessages"
            placeholder="Enter key marketing messages..."
            value={template.keyMessages}
            onChange={handleChange}
            className="w-full p-2 border rounded-md h-24 resize-none pr-10"
          />
          <VariableSelector field="keyMessages" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Call to Action
        </label>
        <div className="relative">
          <input
            type="text"
            name="callToAction"
            placeholder="Enter call to action..."
            value={template.callToAction}
            onChange={handleChange}
            className="w-full p-2 border rounded-md pr-10"
          />
          <VariableSelector field="callToAction" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <div className="relative">
          <textarea
            name="content"
            placeholder="Write your marketing content..."
            value={template.content}
            onChange={handleChange}
            className="w-full p-2 border rounded-md min-h-[200px] resize-none pr-10"
          />
          <VariableSelector field="content" />
        </div>
      </div>

      {showVariableModal && <VariableModal />}
    </>
  );
};

export default RenderMarketingFields;
