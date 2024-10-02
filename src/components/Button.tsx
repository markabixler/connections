
export type ButtonProps = {
    text: string,
    disabled?: boolean,
    onClick?: () => void
}

export const Button = (props: ButtonProps) => {

    const disabledClasses = props.disabled ? ' text-neutral-600 cursor-not-allowed border-neutral-600 hover:border-neutral-600' : ' cursor-pointer'

    return (
        <button
            className={"py-4 px-8 m-2 bg-transparent border-2 rounded-full border-neutral-400 drop-shadow" + disabledClasses}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            <p>{props.text}</p>
        </button>
    )
}