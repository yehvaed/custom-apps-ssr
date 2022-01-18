import * as React from 'react';

export interface HelloWorldProps { firstName?: string; lastName?: string; }

export const getStaticProps = async (req: any): Promise<HelloWorldProps> => {
    return {
        firstName: "test",
        lastName: "test"
    }
}

export const HelloWorld = (props: HelloWorldProps) => <h1 onClick={() => alert("Hello")}> Hi there from React! Welcome {props.firstName} and {props.lastName}!</h1>;