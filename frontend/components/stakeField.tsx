import Link from "next/link";
import styled from "styled-components";

interface Props {
    name: string;
    id: Object;
    accountabilityBuddy: string;
    stakeeAddress: string;
}

const StyledDiv = styled.div`
    border: 1px solid rgb(230, 230, 230);

    &:hover {
        border: 2px solid #badafe;
        cursor: grab;
    }
`;

export const StakeField = ({ name, id, accountabilityBuddy, stakeeAddress }: Props) => {
    return (
        <Link href={`/stake?id=${id}`}>
            <StyledDiv className="w-full my-10 p-5">
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
            </StyledDiv>
        </Link>
    );
};
