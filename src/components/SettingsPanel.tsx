import { useContext } from "react";
import AppContext from "../contexts/AppContext";
import type { ChangeEvent } from "react";
import texts from "../texts";

const SettingsPanel = () => {
  const { settings, setSettings } = useContext(AppContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <section className="flex flex-col items-center text-sm">
      <h4 className="text-base font-semibold mb-0">{texts.settings.heading}</h4>

      <label>
        <input
          type="checkbox"
          name="showEmail"
          checked={settings.showEmail}
          onChange={handleChange}
          className="accent-black"
        />
        {texts.settings.showEmail}
      </label>

      <label>
        <input
          type="checkbox"
          name="showProjects"
          checked={settings.showProjects}
          onChange={handleChange}
          className="accent-black"
        />
        {texts.settings.showProjects}
      </label>

    </section>
  );
};

export default SettingsPanel;
