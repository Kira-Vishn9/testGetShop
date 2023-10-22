import * as React from 'react';
import { IMaskInput } from 'react-imask';
import TextField from '@mui/material/TextField';

type TextMaskCustomProps = {
    name: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextMaskCustom = React.forwardRef<HTMLInputElement, TextMaskCustomProps>(function TextMaskCustom(props, ref) {
    const { onChange, name, ...other } = props; // Добавил "name" к деструктурированным свойствам
    return (
        <IMaskInput
            {...other}
            mask="+7(___) ___-__-__"
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name, value } })}
            overwrite
        />
    );
});

export default function CustomInput({ value, onChange }: { value: string, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
        <TextField
            value={value}
            onChange={(event) => onChange(event)}
            inputComponent={TextMaskCustom}
        />
    );
}
