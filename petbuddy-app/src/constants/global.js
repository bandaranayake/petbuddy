export const PETS = [{ value: 0, label: 'Dogs', icon: 'dog' }, { value: 1, label: 'Cats', icon: 'cat' },
{ value: 2, label: 'Rabbits', icon: 'rabbit' }, { value: 3, label: 'Birds', icon: 'owl' }, { value: 4, label: 'Other', icon: 'paw' }];

export const SERVICES = [{ value: 0, label: 'House sitting', icon: 'home-outline' }, { value: 1, label: 'Pet boarding', icon: 'home-city-outline' },
{ value: 2, label: 'Dog walking', icon: 'dog-service' }, { value: 3, label: 'Pet grooming', icon: 'shower' }];

export const PREFERENCES = [{ value: 0, label: 'Lives in an apartment' }, { value: 1, label: 'Have kids' },
{ value: 2, label: 'Own a cat' }, { value: 3, label: 'Own a dog' }];

export const LEVELS = [{ value: 0, label: 'Level 1' }, { value: 1, label: 'Level 2' }, { value: 2, label: 'Level 3' },
{ value: 3, label: 'Level 4' }, { value: 4, label: 'Level 5' }];

export const DISTRICTS = [{ value: 0, label: 'Ampara' }, { value: 1, label: 'Anuradhapura' }, { value: 2, label: 'Badulla' },
{ value: 3, label: 'Batticaloa' }, { value: 4, label: 'Colombo' }, { value: 5, label: 'Galle' }, { value: 6, label: 'Gampaha' },
{ value: 7, label: 'Hambantota' }, { value: 8, label: 'Jaffna' }, { value: 9, label: 'Kalutara' }, { value: 10, label: 'Kandy' },
{ value: 11, label: 'Kegalle' }, { value: 12, label: 'Kilinochchi' }, { value: 13, label: 'Kurunegala' }, { value: 14, label: 'Mannar' },
{ value: 15, label: 'Matale' }, { value: 16, label: 'Matara' }, { value: 17, label: 'Monaragala' }, { value: 18, label: 'Mulativu' },
{ value: 19, label: 'Nuwara Eliya' }, { value: 20, label: 'Polonnaruwa' }, { value: 21, label: 'Puttalam' }, { value: 22, label: 'Ratnapura' },
{ value: 23, label: 'Trincomalee' }, { value: 24, label: 'Vavuniya' }]

export const STATUS = [{ label: 'Upcoming', value: 0, bg: '#7768AE' }, { label: 'Approved', value: 1, bg: '#4D9DE0' },
{ label: 'Rejected', value: 2, bg: '#E15554' }, { label: 'Cancelled', value: 3, bg: '#E1BC29' }, { label: 'Completed', value: 4, bg: '#3BB273' }];

export const GENDER = [{ label: 'Not Specified', value: 0 }, { label: 'Male', value: 1 }, { label: 'Female', value: 2 }];

export const FindElement = (value, array) => {
    return array.find(e => e.value === value);
}

export const FindLabel = (value, array) => {
    let element = FindElement(value, array);
    return (element != undefined && element != null) ? element.label : null;
}