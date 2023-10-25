import Axios from 'axios'

const accessKey = '1bac8e472a56c259d3a7355624a9e984';
const country_code = 'RU';
const format = 1;

// const apiUrl = `http://apilayer.net/api/validate?access_key=${accessKey}&number=${number}&country_code=${country_code}&format=${format}`;

export const onValidNumber = (inputValue: string) => {
    const number = inputValue.replace('7','')
    Axios
    .get(`http://apilayer.net/api/validate?access_key=${accessKey}&number=${number}&country_code=${country_code}&format=${format}`)
    .then((response) => {
            console.log(response.data.valid);
    })
    .catch((error) => {
            console.error('Произошла ошибка при выполнении запроса:', error);
    });
}