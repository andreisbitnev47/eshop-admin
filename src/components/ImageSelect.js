import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';

const client = require('graphql-client')({
    url: 'http://localhost:5000/graphql',
});


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit / 4,
    },
    noLabel: {
        marginTop: theme.spacing.unit * 3,
    },
    menuItem: {

    }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const MultipleSelect = ({ classes, selectedImages, handleChange, images }) => {
    return (
        <div className={classes.root}>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-multiple">Name</InputLabel>
                <Select
                    multiple
                    value={selectedImages}
                    onChange={handleChange}
                    input={<Input id="select-multiple" />}
                    MenuProps={MenuProps}
                >
                    {images.map(({short, full}) => (
                    <MenuItem key={short} value={short} style={{
                        backgroundImage: `url('${full}')`,
                        height: '40px',
                        backgroundSize: 'contain',
                        backgroundPosition: 'left top',
                        backgroundRepeat: 'no-repeat',
                        display: 'flex',
                        'justify-content': 'flex-end',
                    }}>
                        {/* <div style={{height: '40px', width: '40px', backgroundImage: `url('${full}')`}}></div> */}
                        {short}
                    </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

MultipleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(styles, { withTheme: true }),
    withState('images', 'setImages', []),
    withState('selectedImages', 'setSelectedImages', []),
    withHandlers({
        handleChange: ({ setSelectedImages }) => event => {
            setSelectedImages(event.target.value);
        },
        handleChangeMultiple: ({ setSelectedImages }) => event => {
            const { options } = event.target;
            const value = [];
            for (let i = 0, l = options.length; i < l; i += 1) {
                if (options[i].selected) {
                    value.push(options[i].value);
                }
            }
            setSelectedImages(value)
        },
    }),
    lifecycle({
        componentDidMount() {
            const query = `
                {
                    images
                }
            `;
            const { setImages } = this.props;
            client.query(query, {})
            .then((result) => {
                const images = result.data.images.map(url => ({
                    short: url,
                    full: `http://localhost:5000${url}`
                }));
                setImages(images);
            });
        }
    })

)(MultipleSelect);
