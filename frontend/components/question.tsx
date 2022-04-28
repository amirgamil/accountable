import * as React from "react";

interface Props {
    question: React.ReactNode;
    answer: React.ReactNode;
}

export const Question = ({ question, answer }: Props) => {
    return (
        <div className="w-full">
            <strong>
                <div>{question}</div>
            </strong>
            <div>{answer}</div>
        </div>
    );
};
