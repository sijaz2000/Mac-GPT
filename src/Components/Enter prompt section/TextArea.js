import React from 'react';
import Scrollspy from 'react-scrollspy';
import { TextField } from '@fluentui/react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from '@fluentui/react/lib/Stack';
import { PrimaryButton } from '@fluentui/react/lib/Button';


const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const stackTokens = { childrenGap: 50 };
const columnProps: Partial<IStackProps> = {
    tokens: { childrenGap: 15 },
    styles: { root: { minWidth: "40vw", maxWidth: "40vw", marginLeft: "30vw" } },
};

class TextArea extends React.Component
{
    sendMessage()
    {
        alert('Clicked');
    }
    render()
    {
        return (
            <div>
                <Stack {...columnProps}>
                    <h3 style={{marginBottom: "-0.5vw", color: "#444444",marginTop: '10%', fontSize: '1.5vw', fontFamily: 'Newslab, georgia, Bakersville'}}>Ask Away!</h3>
                    <TextField placeholder={"Enter your question"} multiline autoAdjustHeight styles={{root: { height: '100%' }, field: { height: '150%' },}} />
                </Stack>
                <br />
                <PrimaryButton text="Submit" onClick={this.sendMessage} allowDisabledFocus style={{marginLeft: "47vw"}}/>
            </div>
        );
    }
}

export default TextArea;