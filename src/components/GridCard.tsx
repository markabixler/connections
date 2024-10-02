import {Item} from "../utils/types.ts";

export type GridCardProps = {
    item: Item
    id: number
    selected?: boolean
    onClick?: (card: string) => void
}

export const GridCard = (props: GridCardProps) => {
    const selectedClasses = props.selected ? ' border-violet-600 ' : ' border-gray-300 '
    return (
        <div
            className={selectedClasses + " border-4 bg-gray-300 py-4 px-8 m-2 text-black rounded-lg drop-shadow-lg cursor-pointer"}
            onClick={() => {
                if(props.onClick) {
                   props.onClick(props.item.text);
                   console.log(props.item.text)
                }
            }}
        >
            <p>{props.item.text}</p>
        </div>
    );
}