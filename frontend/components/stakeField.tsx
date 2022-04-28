interface Props {
    name: string;
    id: Object;
    accountabilityBuddy: string;
    stakeeAddress: string;
}

export const StakeField = ({ name, id, accountabilityBuddy, stakeeAddress }: Props) => {
    return (
        <div style={{ border: "1px solid rgb(230, 230, 230)" }} className="w-full my-10 p-5">
            <strong>
                <p>Name</p>
            </strong>
            <p>{name}</p>
            <strong>
                <p>ID</p>
            </strong>
            <p>{id.toString()}</p>
            <strong>
                <p>Buddy</p>
            </strong>
            <p>
                <code>{accountabilityBuddy}</code>
            </p>
            <strong>
                <p>Stakee</p>
            </strong>
            <p>
                <code>{stakeeAddress}</code>
            </p>
        </div>
    );
};
