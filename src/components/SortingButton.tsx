export default function SortingButton(props: {name: string, onClick: () => void, disabled: boolean}) {
    return (
        <button
            className="bg-blue-800 hover:bg-blue-800 text-white py-2 px-4 rounded mb-4 disabled:opacity-50"
            onClick={() => props.onClick()}
            disabled={props.disabled}
        >
            {props.name}
        </button>
    )
}