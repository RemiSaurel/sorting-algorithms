export default function SortingButton(props: {name: string, onClick: () => void, disabled: boolean}) {
    return (
        <button
            className="bg-cyan-700 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded mb-4 disabled:bg-gray-400"
            onClick={() => props.onClick()}
            disabled={props.disabled}
        >
            {props.name}
        </button>
    )
}