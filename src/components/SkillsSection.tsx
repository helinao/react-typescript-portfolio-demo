import { useState } from 'react';
import SkillsManager from './SkillsManager';
import type { Dispatch, SetStateAction } from "react";
import type { Skill } from "../types";
import texts from "../texts";

interface SkillsSectionProps {
  skills: Skill[];
  setSkills: Dispatch<SetStateAction<Skill[]>>;
  className?: string;
}

const SkillsSection = ({ skills, setSkills }: SkillsSectionProps) => {
  const [showSkills, setShowSkills] = useState(false); // näitab või peidab sektsiooni

  return (
    <div className="skills-section 
                    w-full flex flex-col items-center gap-4 justify-start
                    md:justify-start md:items-start md:p-4 box-border">
      <button onClick={() => setShowSkills(!showSkills)} className='m-4'>
        {showSkills ? texts.skills.hide : texts.skills.show} {texts.skills.title}
      </button>

      {showSkills && (
        <SkillsManager skills={skills} setSkills={setSkills} />
      )}
    </div>
  );
};

export default SkillsSection;
