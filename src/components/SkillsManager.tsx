import { useState } from "react";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import type { Skill, SkillCategory } from "../types";
import texts from "../texts";

interface SkillsManagerProps {
  skills: Skill[];
  setSkills: Dispatch<SetStateAction<Skill[]>>;
}

const SkillsManager = ({ skills, setSkills }: SkillsManagerProps) => {
  const [newSkill, setNewSkill] = useState<{ name: string; category: SkillCategory | "" }>({name:"", category:""}); //newskill hoiab uut skilli. algväärtuseks tühjad stringid nimi ja kategooria. 
  const [removeId, setRemoveId] = useState('');
  const [searchSkill, setSearchSkill] = useState('');

  //funktsioon mis käivitub kui kasutaja vajutab lisa oskus nuppu
    const handleAddSkill = () => { 
        const category = newSkill.category;
        if (!newSkill.name.trim() || !category) { //kontrolime, et nimi ei oleks tühi eemaldades tühikud ja kontrollime, et kategooria oleks valitud. 
            alert(texts.skills.addError);
            return;
        }
        const updated: Skill[] = [...skills, { name: newSkill.name, category, id: Date.now() }]; // lisame uue oskuse massiivi. ...skills - kopeerime olemasolevad oskused. ...newskill, id - lisab uue oskuse. 
            setSkills(updated); //uendame skillide listi uue oskusega
            setNewSkill({ name: "", category: "" }); // puhastame vormi
        };

    //funktsioon mis kustutab oskuse
    const handleRemoveSkill = () => { 
        if (!removeId) {
            alert(texts.skills.removeError);
            return;
        }
        setSkills(skills.filter((s) => s.id !== Number(removeId)));  
        setRemoveId(""); // tühjendame valiku peale kustutamist
    };

  return (
    <div className="skills-manager w-full grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
    <div className="flex flex-col gap-6 items-center text-center lg:items-center">
      {/*oskuste kategooriseerimine ning nende arvu näitamine*/}       
      <div>
        <h2 className="text-2xl font-bold">{texts.skills.heading}</h2>
        <h3 className="text-lg font-semibold">{texts.skills.technical} ({skills.filter(s => s.category === "Technical").length})</h3> {/*skills.filter(s => s.category === "Technical") võtab skills massiivist ainult need elemendid, millel on see kategooria. lengths loeb mitu elementi on*/}
        <ul>
            {skills
            .filter(s => s.category === "Technical")  //filtreerime skills massiivist välja ainult antud kategooriaga oskused
            .filter(s => s.name.toLowerCase().includes(searchSkill.toLowerCase()))  //filtreerime skills massiivist välja otsitava sisu
            .map(s => (
                <li key={s.id}>{s.name}</li> //loome mapiga uue li elemendi igast oskusest
            ))}
        </ul>

        <h3 className="text-lg font-semibold">{texts.skills.soft} ({skills.filter(s => s.category === "Soft Skills").length})</h3>
        <ul>
            {skills
            .filter(s => s.category === "Soft Skills")
            .filter(s => s.name.toLowerCase().includes(searchSkill.toLowerCase()))
            .map(s => (
                <li key={s.id}>{s.name}</li>
            ))}
        </ul>

        <h3 className="text-lg font-semibold">{texts.skills.tools} ({skills.filter(s => s.category === "Tools").length})</h3>
        <ul>
            {skills
            .filter(s => s.category === "Tools")
            .filter(s => s.name.toLowerCase().includes(searchSkill.toLowerCase()))
            .map(s => (
                <li key={s.id}>{s.name}</li>
            ))}
        </ul>
        </div>

        {/*otsimiseks lahter*/}
        <div>
            <input
                type="text"
                placeholder={texts.skills.search}
                value={searchSkill}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchSkill(e.target.value)}
                className="w-full p-1.5 border border-black border-solid rounded text-sm m-2"
            />
        </div>
      </div>

    <div className="flex flex-col gap-6 items-center text-center lg:items-center">
    {/*lisame uue oskuse*/}
       <div>
          <h2 className="text-2xl font-bold">{texts.skills.addHeading}</h2>
        <input
          type="text"
          placeholder={texts.skills.skillName}
          value={newSkill.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewSkill({ ...newSkill, name: e.target.value })}
          className="w-2/4 p-1.5 border border-black border-solid rounded text-sm"
        />
        <select
          value={newSkill.category}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setNewSkill({ ...newSkill, category: e.target.value as SkillCategory | "" })}
          className="w-1/3 p-1.5 border border-black border-solid rounded text-sm m-2"
        >
          <option value="">{texts.skills.chooseCategory}</option>
          <option value="Technical">{texts.skills.categories.technical}</option>
          <option value="Soft Skills">{texts.skills.categories.soft}</option>
          <option value="Tools">{texts.skills.categories.tools}</option>
        </select>
        <button onClick={handleAddSkill} className="m-2">{texts.skills.add}</button>
      </div>

      {/*kustutame elemendid valides dropdown listist elemendi ja valides kustuta*/}
       <div>
        <h2 className="text-2xl font-bold">{texts.skills.removeHeading}</h2>
        <select value={removeId} onChange={(e: ChangeEvent<HTMLSelectElement>) => setRemoveId(e.target.value)} className="w-full p-1.5 border border-black border-solid rounded text-sm">
          <option value="">{texts.skills.chooseSkill}</option>
          {skills.map((s) => (
            <option key={s.id} value={s.id}> 
                {s.name} ({s.category})
            </option>
          ))}
        </select>
        <button onClick={handleRemoveSkill} className="m-2">{texts.skills.remove}</button>
      </div>
      </div>
    </div>
  );
};

export default SkillsManager;
