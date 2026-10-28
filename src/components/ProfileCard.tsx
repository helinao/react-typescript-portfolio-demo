import ContactButton from "./ContactButton";
import PersonalInfoManager from "./PersonalInfoManager";
import type { Dispatch, SetStateAction } from "react";
import type { PersonalInfo } from "../types";
import texts from "../texts";

interface ProfileCardProps {
  image: string;
  info: PersonalInfo;
  setInfo: Dispatch<SetStateAction<PersonalInfo>>;
  className?: string;
}

const ProfileCard = ({ image, info, setInfo }: ProfileCardProps) => {
  return (
    <div className="profile-card
                    w-full flex flex-col gap-4 p-4 justify-center items-center text-center
                    lg:grid lg:grid-cols-6 lg:gap-8s lg:items-start lg:justify-between lg:text-left">
        <div className="flex justify-center lg:justify-start lg:col-start-1 lg:col-span-2">
        {image && (
          <img
            src={image}
            alt="Profiilipilt"
            className="flex flex-col w-80 h-auto -mt-4 lg:-mb-4 lg:ml-6 lg:w-96 lg:col-start-1"
          />
        )}
        </div>
        <div className="flex flex-col justify-center lg:ml-6 lg:col-start-3 lg:col-span-2 lg:h-full lg:gap-4">
          <p className="text-4xl lg:text-6xl font-bold">{info.name}</p>
          <p className="text-xl lg:text-3xl font-semibold">{info.title}</p>
          <p className="text-base lg:text-lg text-justify">{info.bio}</p>
        </div>

      <div className="flex flex-col w-full gap-6 lg:col-start-5 lg:col-span-2 lg:justify-center lg:h-full">
        <div className="flex flex-col items-center w-full">
          {info && (
            <ContactButton
              email={info.email}
              phone={info.phone}
              linkedin={info.linkedin}
              github={info.github}
            />
          )}
        </div>

        <div className="flex flex-col items-center w-full">
          <PersonalInfoManager info={info} setInfo={setInfo} />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
