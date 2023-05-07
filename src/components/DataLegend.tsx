export default function DataLegend() {
    return (
        <div className="flex flex-col gap-2">
            <div>
                <span className="h-6 border-4 rounded border-red-400 mr-2"></span>
                = sélectionné
            </div>
            <div>
                <span className="h-6 border-4 rounded border-yellow-500 mr-2"></span>
                = en mouvement
            </div>
            <div>
                <span className="h-6 border-4 rounded border-green-600 mr-2"></span>
                = trié
            </div>
        </div>
    );
}