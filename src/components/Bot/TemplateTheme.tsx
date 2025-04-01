import { useState } from 'react';
import { Settings } from 'lucide-react';
import { TemplateCard } from './TemplateCard';
import { templateSettings } from '../../data';

// Define a type for the template keys
type TemplateType = 'light' | 'dark' | 'minimalist' | 'teal' | 'rain' | 'rays' | 'aqua' | 'pi';

const ThemeCustomizer = () => {
  const [settings, setSettings] = useState({
    template: 'typebot-light',
    background: {
      type: 'color',
      value: '#ffffff'
    },
    container: {
      maxWidth: 750,
      maxHeight: 80,
      showBackground: true
    }
  });

  const handleTemplateChange = (templateType: TemplateType) => {
    setSettings(prev => ({
      ...prev,
      ...templateSettings[templateType] // This will now have proper type checking
    }));
  };

  return (
    <div className="flex min-h-screen">
      {/* Theme Customization Sidebar */}
      <div className="w-80 bg-white border-r">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium">Customize the theme</h2>
        </div>

        <div className="p-4 space-y-6">
          {/* Templates */}
          <div>
            <h3 className="text-sm font-medium mb-3">Templates</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "Typebot Light", type: "light" },
                { name: "Typebot Dark", type: "dark" },
                { name: "Minimalist Black", type: "minimalist" },
                { name: "Minimalist Teal", type: "teal" },
                { name: "Bright Rain", type: "rain" },
                { name: "Ray of Lights", type: "rays" },
                { name: "Aqua Glass", type: "aqua" },
                { name: "Pi", type: "pi" }
              ].map((template) => (
                <TemplateCard
                  key={template.type}
                  name={template.name}
                  type={template.type}
                  isSelected={settings.template === templateSettings[template.type as TemplateType].template}
                  onClick={() => handleTemplateChange(template.type as TemplateType)}
                />
              ))}
            </div>
          </div>

          {/* Global Settings */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium">Global</h3>
              <button className="flex items-center gap-1.5 text-sm text-gray-600">
                <Settings size={14} />
                Show Typebot brand
              </button>
            </div>

            {/* Background */}
            <div className="mb-4">
              <label className="text-sm text-gray-600 block mb-2">Background</label>
              <div className="flex gap-2">
                <button className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded text-sm">
                  Color
                </button>
                <button className="px-4 py-1.5 bg-gray-100 rounded text-sm">
                  Image
                </button>
                <button className="px-4 py-1.5 bg-gray-100 rounded text-sm">
                  None
                </button>
              </div>
            </div>
          </div>

          {/* Chat Settings */}
          <div>
            <h3 className="text-sm font-medium mb-3">Chat</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 block mb-1">Max width:</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    value={settings.container.maxWidth}
                    onChange={(e) => setSettings({
                      ...settings,
                      container: {
                        ...settings.container,
                        maxWidth: parseInt(e.target.value)
                      }
                    })}
                    className="w-20 px-2 py-1 border rounded"
                  />
                  <span className="text-sm text-gray-500">px</span>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600 block mb-1">Max height:</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    value={settings.container.maxHeight}
                    onChange={(e) => setSettings({
                      ...settings,
                      container: {
                        ...settings.container,
                        maxHeight: parseInt(e.target.value)
                      }
                    })}
                    className="w-20 px-2 py-1 border rounded"
                  />
                  <span className="text-sm text-gray-500">%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Background</span>
                <button
                  className={`w-11 h-6 rounded-full transition-colors ${
                    settings.container.showBackground ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                  onClick={() => setSettings({
                    ...settings,
                    container: {
                      ...settings.container,
                      showBackground: !settings.container.showBackground
                    }
                  })}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                      settings.container.showBackground ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className={`flex-1 ${
        settings.background.type === 'gradient' 
          ? `bg-gradient-to-br ${settings.background.value}`
          : ''
        }`}
        style={{
          backgroundColor: settings.background.type === 'color' ? settings.background.value : undefined
        }}
      >
        <div className="w-full h-full rounded-lg bg-white/10 backdrop-blur-sm" />
      </div>
    </div>
  );
};

export default ThemeCustomizer;