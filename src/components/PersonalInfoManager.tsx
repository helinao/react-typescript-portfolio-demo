import { useState, useEffect, useRef } from "react";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import type { PersonalInfo } from "../types";
import texts from "../texts";

interface PersonalInfoManagerProps {
  info: PersonalInfo;
  setInfo: Dispatch<SetStateAction<PersonalInfo>>;
}

const PersonalInfoManager = ({ info, setInfo }: PersonalInfoManagerProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

   useEffect(() => {
    if (isEditing && nameInputRef.current) {
      nameInputRef.current.focus(); //fookus nime väljale kui edit-režiim aktiveerub
    }
  }, [isEditing]); //see on soltuvuses isEditinguga

  // väljade muutmine
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  // andmete salvestamine koos valideerimisega
  const handleSave = () => {
    if(!info.name.trim() || !info.email.trim()){
        alert(texts.profile.required);
        return;
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    /* / ... / - regulaaravaldise süntaks 
    ^ kontrolli stringi algusest ja $ kontrolli lõpuni välja
    [^\s@]+ - [] näitab märgiklassi, mis tähemärgid on lubatud. ^ ütleb, et kõik peale järgneva on lubatud. \s keelab tühikud, tabid. @ on konkreetne sümbol mida ei tohi kasutada. + tähendab et 1 kord või rohkem. 
    @ peab olema üks ätt stringis selle koha peal 
    \. - see märgistab tavalist punkti regexis. */ 
    if(!emailRegex.test(info.email)) { //.test() on regexi meetod, mis võtab argumendist stringi ja tagastab true or false.
        alert(texts.profile.invalidEmail);
        return;
    };

    //kui kõik on korras siis salvesta
    localStorage.setItem("personal-info", JSON.stringify(info));
    setIsEditing(false);
    alert(texts.profile.saved);
  };

  //leiame kõik vajalikud väärtused progressbari jaoks
  const fields = Object.values(info); //object.values võtab kõik info objekti väljade võtmete väärtused ja paneb need massiivi
  const filledCount = fields.filter((val) => val.trim() !== '').length; //võtame fields massiivist filtriga kõik väljad, mis pole tühjad. eemaldame "val.trim() !== ''"-ga kõik tühikud ja läbi selle kontrollime ka, et poleks tühja stringina väärtusi. length loendab järgi jäänud väärtusi. val on ajutine nimi ühele väärtusele fields massiivist, mida filter kontrollib parasjagu.
  const totalFields = fields.length; //leiame kogu pikkuse
  const progress = Math.round((filledCount/totalFields)*100); //täidetud väljad / kõik väljad * 100, et saada %. math.round ümardab lähima täisarvuni

  return (
  <div className="personalInfoManager flex flex-col items-center gap-4 justify-start
                  md:p-4 md:box-border md:mb-4 md:grid md:grid-cols-2
                  lg:flex lg:flex-col lg:gap-4">
    <div className="info-box p-4"> {/* taustakarbi jaoks */}

      {/* Progressbar */}
      <div>
        <div className="h-5 w-full bg-white rounded-sm overflow-hidden border border-solid border-black">
          <div
            className={`h-full bg-emerald-700 transition-[width] duration-300 ease-in-out ${progress === 100 ? "bg-emerald-900" : ""}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p>{texts.profile.progress(progress)}</p>
      </div>

      {/* Nupud */}
      {isEditing ? (
        <div className="flex gap-4">
          <button onClick={handleSave}>{texts.profile.save}</button>
          <button onClick={() => setIsEditing(false)}>{texts.profile.cancel}</button>
        </div>
      ) : (
        <div className="flex gap-4">
          <button onClick={() => setIsEditing(true)}>{texts.profile.edit}</button>
        </div>
      )}

      {isEditing && (
        <div className="edit-form">
          <div className="flex flex-col m-2">
            <div> 
              <label className="font-bold">{texts.profile.nameLabel}</label> 
              <input 
                type="text" 
                name="name" 
                value={info.name} 
                onChange={handleChange} 
                ref={nameInputRef} 
              /> 
            </div> 
            
            <div> 
              <label className="font-bold">{texts.profile.titleLabel}</label>
              <input 
                type="text"
                name="title" 
                value={info.title} 
                onChange={handleChange} 
              />
            </div>

            <div>
              <label className="font-bold">{texts.profile.bioLabel}</label>
              <textarea
                name="bio"
                value={info.bio}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="font-bold">{texts.profile.emailLabel}</label>
              <input
                type="email"
                name="email"
                value={info.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="font-bold">{texts.profile.phoneLabel}</label>
              <input
                type="text"
                name="phone"
                value={info.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="font-bold">{texts.profile.linkedinLabel}</label>
              <input
                type="url"
                name="linkedin"
                value={info.linkedin}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="font-bold">{texts.profile.githubLabel}</label>
              <input
                type="url"
                name="github"
                value={info.github}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);

};

export default PersonalInfoManager;
