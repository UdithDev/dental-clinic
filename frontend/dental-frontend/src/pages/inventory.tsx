import Welcome from "../components/inventory/Welcome";

function Inventory(){
    return(
        <div className="flex flex-col">
            <div className="inline-block min-w-full">
                <Welcome/>
            </div>

        </div>
    )
}


export default Inventory;