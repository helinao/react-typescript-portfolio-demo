import { useState } from 'react';
import texts from "../texts";

interface ContactButtonProps {
    email?: string;
    phone?: string;
    linkedin?: string;
    github?: string;
}

const ContactButton = ({email, phone, linkedin, github}: ContactButtonProps) => {
    const [showContact, setShowContact] = useState(false);

    //loome funktsiooni, mis võtab argumendiks teksti, mida soovime kopeerida. kasutab clipboard API-t, et text lõikelauale copyda. 
    const copyText = (text: string) => {
        navigator.clipboard.writeText(text)
            .then(() => alert(texts.contact.copied(text)))
            .catch(() => alert(texts.contact.copyFailed))
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            <button className='contact-btn' onClick={() => setShowContact(!showContact)}>
                {showContact ? texts.contact.hide : texts.contact.show} {texts.contact.details}
            </button>

            {showContact && (
                <div className='contact-info'>
                    {email && (
                        <p>{texts.contact.email}:{' '} <a href="#" className="copy-link" onClick={(e) => { e.preventDefault(); copyText(email);}}
                            >{email}</a></p>
                    )}

                    {phone && (
                        <p>{texts.contact.phone}: {' '} <a href="#" className="copy-link" onClick={(e) => { e.preventDefault(); copyText(phone);}}
                            >{phone}</a></p>
                    )}

                    {linkedin && (
                        <a href={linkedin} target="_blank" rel="noopener noreferrer">{texts.contact.linkedin}</a>
                    )}

                    {github && (
                        <a href={github} target="_blank" rel="noopener noreferrer">{texts.contact.github}</a>
                    )}
                </div>
            )}
        </div>
    )
}

export default ContactButton;
