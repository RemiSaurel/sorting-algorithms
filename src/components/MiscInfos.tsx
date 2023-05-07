import { AiFillGithub } from 'react-icons/ai';
import { BsWikipedia } from 'react-icons/bs';
export default function MiscInfos() {
    return (
        <div className="flex flex-col gap-2 w-full justify-center">
            <a href="https://fr.wikipedia.org/wiki/Algorithme_de_tri" target="_blank" className="flex" rel="noreferrer">
                <div className="flex w-full hover:bg-blue-200 rounded p-2">
                    <BsWikipedia className="mr-2 h-6 w-6"/>
                    Algos de tri
                </div>
            </a>

            <a href="https://github.com/RemiSaurel/sorting-algorithms" target="_blank" className="flex" rel="noreferrer">
                <div className="flex w-full hover:bg-blue-200 rounded p-2">
                    <AiFillGithub className="mr-2 h-6 w-6"/>
                    GitHub
                </div>
            </a>
        </div>
    );
}