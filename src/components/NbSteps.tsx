export default function NbSteps({nbSteps}: {nbSteps: number}) {
    return (
        <div className="flex justify-center my-4">
            <div className="flex items-center gap-4">
                Nb étapes : {nbSteps}
            </div>
        </div>
    )
}