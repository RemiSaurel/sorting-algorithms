export default function GenerateArrayButton(props: {resetArray: () => void, disabled: boolean}) {
    return (
        <button
            className="bg-gray-700 enabled:hover:bg-gray-800 text-white py-2 px-4 rounded disabled:opacity-50"
            onClick={() => props.resetArray()}
            disabled={props.disabled}
        >
            👋 Générer
        </button>
    )
}