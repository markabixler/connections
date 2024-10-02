import {ReactNode} from "react";
import {GridCard} from "./GridCard.tsx";
import {Category, Item} from "../utils/types.ts";
import {CompletedCategory} from "./CompletedCategory.tsx";

export type GridProps = {
    items: Item[],
    selected: Item[],
    completedCategories: Category[],
    onCardClicked: (card: string) => void
}

export const Grid = (props: GridProps) => {

    // const items: ReactNode[] = props.items.map<ReactNode>((item, index) => {
    //    return <GridCard key={index} item={item} id={index} onClick={props.onCardClicked} selected={props.selected.indexOf(item) > -1}/>
    // })

    const rows: ReactNode[][] = []

    for(let i = 0; i < props.items.length; i+=4){
        rows.push(props.items.slice(i, i+4).map((item, index) => {
            return <GridCard key={i+index} item={item} id={index} onClick={props.onCardClicked} selected={props.selected.indexOf(item) > -1}/>
        }));
    }

    const renderedRows = rows.map((row, index) => {
        return (
            <div key={index} className="grid grid-cols-4">
                {row}
            </div>
        );
    });

    const completedCategories = props.completedCategories ? props.completedCategories.map((category, index) => {
        return <CompletedCategory category={category} key={index}/>
    }) : null;

    return (
        <div className="m-2 w-full">
            {completedCategories}
            {renderedRows}
        </div>
    )
}