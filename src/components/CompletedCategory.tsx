import {Category} from "../utils/types.ts";

export type CompletedCategoryProps = {
    category: Category
}

export const CompletedCategory = (props: CompletedCategoryProps) => {

    // const bgColor = `bg-${props.category.rank}-400 border-${props.category.rank}-400`

    let bg = "";
    switch (props.category.rank) {
        case "yellow":
            bg = "bg-amber-400 border-amber-400";
            break;
        case "green":
            bg = "bg-green-600 border-green-600";
            break;
        case "blue":
            bg = "bg-blue-500 border-blue-500";
            break;
        case "purple":
            bg = "bg-violet-600 border-violet-600";
            break;

    }

    return (
        <div className="grid grid-cols-1 w-full">
            <div className={bg + " border-4 py-4 text-white m-2 rounded-lg "}>
                <h3 className="font-bold">{props.category.title}:</h3>
                <p>{props.category.cards.join(", ")}</p>
            </div>
        </div>
    )
}