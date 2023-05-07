
export default function SortingButton(props: {name: string, onClick: () => void, disabled: boolean}) {
    return (
        <button
            className="bg-green-700 enabled:hover:bg-green-800 text-white py-2 px-4 rounded disabled:opacity-50"
            onClick={() => props.onClick()}
            disabled={props.disabled}
        >
            {props.name}
        </button>
    )
}