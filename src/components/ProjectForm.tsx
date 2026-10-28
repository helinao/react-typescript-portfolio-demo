import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { Project, ProjectFormData } from "../types";
import texts from "../texts";

const ProjectForm = () => {
    const emptyForm: ProjectFormData = {
        title: '',
        description: '',
        technologies: '',
        category: '',
        status: '',
        link: '',
    };
    const [formData, setFormData] = useState<ProjectFormData>(emptyForm);

    const [projects, setProjects] = useState<Project[]>([]);
    const [filter, setFilter] = useState('all');

    //laadi projektid localstoragest kui komponent laetakse
     useEffect(() => {
        const savedProjects = localStorage.getItem('portfolio-projects');
        if (savedProjects) {
            setProjects(JSON.parse(savedProjects));
            console.log('Laetud projektid:', JSON.parse(savedProjects));
        }
    }, []);

    // Filtered projects arvutamine
    const filteredProjects = projects.filter(p => 
        filter === 'all' || p.category === filter
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => 
            ({...prev,
                [name]: value
            }));
    };

    //lisa saatmise ja salvestamise funktsioon

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //kontrollime kas kõik väljad on täidetud
        if(!formData.title.trim() || !formData.description.trim() || !formData.technologies.trim() || !formData.category || !formData.status || !formData.link.trim()) {
            alert(texts.projects.required);
            return;
        };

        //loome uue projekti
        const newProject = {
            ...formData,
            id: Date.now(), //lihtne ID
            createdAt: new Date().toISOString(),
            technologies: formData.technologies.split(',').map(tech => tech.trim()) //muuda arrayks
        };

        //salvestame localStoragesse
        const existingProjects: Project[] = JSON.parse(localStorage.getItem('portfolio-projects') || '[]');
        const updatedProjects = [...existingProjects, newProject];
        localStorage.setItem('portfolio-projects', JSON.stringify(updatedProjects))

          //Uuenda komponendi state'i
        setProjects(updatedProjects);

        alert(texts.projects.savedSuccess);

        // NUlli vorm
        setFormData(emptyForm)
    };

    return (
        <div className="submit-project
                        flex flex-col gap-4 p-4">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start w-full">
                <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4 w-full"> 
                <h2 className="text-2xl font-bold">{texts.projects.addHeading}</h2>
                <div>
                    <label htmlFor="title" className="block mb-1">{texts.projects.title}</label>
                    <input 
                        type='text'
                        id='title'
                        name='title'
                        value={formData.title}
                        onChange={handleChange}
                        placeholder={texts.projects.title}
                        className="w-4/5 p-1.5 border border-black border-solid rounded text-sm"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block mb-1">{texts.projects.description}</label>
                    <textarea 
                        id='description'
                        name='description'
                        rows={3}
                        value={formData.description}
                        onChange={handleChange}
                        placeholder={texts.projects.description}
                        className="w-4/5 p-1.5 border border-black border-solid rounded text-sm"
                    />
                </div>

                <div>
                    <label htmlFor="technologies" className="block mb-1">{texts.projects.technologies}</label>
                    <input 
                        type='text'
                        id='technologies'
                        name='technologies'
                        value={formData.technologies}
                        onChange={handleChange}
                        placeholder={texts.projects.technologiesPlaceholder}
                        className="w-4/5 p-1.5 border border-black border-solid rounded text-sm"
                    />
                </div>

                <div>
                    <label htmlFor="category" className="block mb-1">{texts.projects.category}</label>
                    <select 
                        id='category'
                        name='category'
                        value={formData.category}
                        onChange={handleChange}
                        className="w-4/5 p-1.5 border border-black border-solid rounded text-sm text-text-10"
                    >
                        <option value="">{texts.projects.chooseCategory}</option>
                        {texts.projects.categories.map((category) => <option key={category} value={category}>{category}</option>)}
                    </select>
                </div>

                <div>
                    <label htmlFor="status" className="block mb-1">{texts.projects.status}</label>
                    <select 
                        id='status'
                        name='status'
                        value={formData.status}
                        onChange={handleChange}
                        className="w-4/5 p-1.5 border border-black border-solid rounded text-sm text-text-10"
                    >
                        <option value="">{texts.projects.chooseStatus}</option>
                        {texts.projects.statuses.map((status) => <option key={status} value={status}>{status}</option>)}
                    </select>
                </div>

                <div>
                    <label htmlFor="link" className="block mb-1">{texts.projects.link}</label>
                    <input 
                        type='url'
                        id='link'
                        name='link'
                        value={formData.link}
                        onChange={handleChange}
                        placeholder={texts.projects.linkPlaceholder}
                        className="w-4/5 p-1.5 border border-black border-solid rounded text-sm"
                    />
                </div>

                <button type="submit" className="w-1/2 p-2">
                    {texts.projects.add}
                </button>
            </form>

            <div className='saved-projects mt-6'> 
                <h3 className="text-lg font-semibold">{texts.projects.saved} ({filteredProjects.length})</h3>
                {filteredProjects.map(project => (
                    <div key={project.id} className="project-card
                                                    w-11/12 p-0.5 pr-4 pb-2 pl-4 m-2">
                        <h4>{project.title}</h4>
                        <p>{project.description}</p>
                        <p><strong>{texts.projects.technologies}: </strong>{project.technologies.join(',')}</p>
                        <p><strong>{texts.projects.category}: </strong>{project.category}</p>
                        <p><strong>{texts.projects.status}: </strong>{project.status}</p>
                        <p><strong>{texts.projects.link}: </strong>{project.link}</p>
                    </div>
                ))}
            </div>
            </div>
            
            <div className="filter-projects">
            <h4>{texts.projects.filter}</h4>
            <button onClick={() => setFilter('all')} className="p-2 mr-8 mb-4 md:mr-8">
                {texts.projects.all} ({projects.length})
            </button>
            <button onClick={() => setFilter(texts.projects.categories[0])} className="p-2 mr-8 mb-4 md:mr-8">
                {texts.projects.categories[0]} ({projects.filter(p => p.category === texts.projects.categories[0]).length})
            </button>
            <button onClick={() => setFilter(texts.projects.categories[1])} className="p-2 mr-8 mb-4 md:mr-8">
                {texts.projects.categories[1]} ({projects.filter(p => p.category === texts.projects.categories[1]).length})
            </button>
            <button onClick={() => setFilter(texts.projects.categories[2])} className="p-2 mr-8 mb-4 md:mr-8">
                {texts.projects.categories[2]} ({projects.filter(p => p.category === texts.projects.categories[2]).length})
            </button>
            <button onClick={() => setFilter(texts.projects.categories[3])} className="p-2 mr-8 mb-4 md:mr-8">
                {texts.projects.categories[3]} ({projects.filter(p => p.category === texts.projects.categories[3]).length})
            </button>
            </div>
        </div>
    )
};

export default ProjectForm;
