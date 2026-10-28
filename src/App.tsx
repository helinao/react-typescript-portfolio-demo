import './App.css'
import Header from './components/Header'
import Navigation from './components/Navigation'
import ProfileCard from './components/ProfileCard'
import myPhoto from './assets/images/me.jpg'
import SkillsSection from './components/SkillsSection'
import Footer from './components/Footer'
import ProjectForm from './components/ProjectForm'
import AppContext from './contexts/AppContext'
import { useState, useEffect, useContext } from "react";
import type { PersonalInfo, Skill } from "./types";
import texts from "./texts";

const defaultPersonalInfo: PersonalInfo = {
  name: texts.profile.name,
  title: texts.profile.title,
  bio: texts.profile.bio,
  email: texts.contact.emailAddress,
  phone: "",
  linkedin: "",
  github: "",
};

function App() {
  const links = [texts.navigation.about, texts.navigation.projects, texts.navigation.contact]
  const { settings } = useContext(AppContext);

  // personalInfo tuleb localStoragest või on tühi
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(() => {
    const saved = localStorage.getItem("personal-info");
    if (!saved) {
      return defaultPersonalInfo;
    }

    const savedInfo = JSON.parse(saved) as Partial<PersonalInfo>;
    return {
      ...defaultPersonalInfo,
      ...savedInfo,
      email: savedInfo.email || defaultPersonalInfo.email,
    };
  });

  // laeme oskused localstoragest
  const [skills, setSkills] = useState<Skill[]>(() => {
    const saved = localStorage.getItem("skills");
    return saved ? JSON.parse(saved) : [];
  });

  // salvestame localStorage'i iga kord kui skills muutub
  useEffect(() => {
    localStorage.setItem("skills", JSON.stringify(skills));
  }, [skills]);

  return (
    <main className="grid grid-flow-row grid-cols-1 w-full mx-auto
                     md:grid-cols-8
                     lg:grid-cols-8 lg:grid-rows-[auto_auto_auto_auto_auto_auto] lg:max-w-[2500px]">

      <div className="col-span-1
                      md:col-start-1 md:col-span-8
                      lg:row-start-1">
        <Header name={personalInfo.name} title={personalInfo.title}>
          <Navigation links={links} />
        </Header>
      </div>

      <div className="col-span-1
                      md:col-start-1 md:col-span-8
                      lg:row-start-2 lg:row-span-2 h-full flex">
        <ProfileCard
          image={myPhoto}
          info={personalInfo}
          setInfo={setPersonalInfo}
          className="flex flex-col justify-between h-full w-full"
        />
      </div>

      <div className="col-span-1
                      md:col-start-1 md:col-span-8
                      lg:row-start-4 lg:row-span-2 h-full flex">
        <SkillsSection
          skills={skills}
          setSkills={setSkills}
          className="flex flex-col justify-between h-full w-full"
        />
      </div>

      {settings.showProjects && (
        <div id='projektid' className="col-span-1
                        md:col-start-1 md:col-span-8
                        lg:row-start-6">
          <ProjectForm />
        </div>
      )}

      <div className="col-span-1
                      md:col-start-1 md:col-span-8
                      lg:row-start-7">
        <Footer
          contact={{
            email: personalInfo.email,
            phone: personalInfo.phone,
            linkedin: personalInfo.linkedin,
          }}
          socialMedia={{ github: personalInfo.github }}
        />
      </div>
    </main>
  )
}

export default App
