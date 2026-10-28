import { useContext } from "react";
import AppContext from "../contexts/AppContext";
import SettingsPanel from './SettingsPanel';
import type { ContactInfo, SocialMedia } from "../types";
import texts from "../texts";

interface FooterProps {
    contact?: ContactInfo;
    socialMedia?: SocialMedia;
}

const Footer = ({ contact = {}, socialMedia = {} }: FooterProps) => {
    const currentYear = new Date().getFullYear();
    const { settings } = useContext(AppContext);

    return (
        <footer className="row-start-6 w-full p-4 flex flex-col items-center
                   md:flex md:flex-row md:justify-between md:items-start md:leading-4">
            <div>
                <div className="contact-info">
                    {settings.showEmail && contact.email && <p>{texts.footer.email}: {contact.email}</p>}
                    {contact.phone && <p>{texts.footer.phone}: {contact.phone}</p>}
                    {contact.linkedin && (
                        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                        {texts.footer.linkedin}
                        </a>
                    )}
                </div>

                <div className="mt-4">
                    {socialMedia.github && (
                        <a href={socialMedia.github} target="_blank" rel="noopener noreferrer">
                        {texts.footer.github}
                        </a>
                    )}
                </div>
            </div>

            <div className="flex flex-col items-end justify-start md:ml-auto gap-2">
                <p>&copy; {currentYear} Helina Ohtla</p>
                <SettingsPanel />
            </div>
        </footer>
    );
};

export default Footer;
