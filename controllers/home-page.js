import core from '../cores/home-page';
import path from 'path';

const Controller = {
    getHomePage(req, res, next) {
        const dependencies = {
            req,
            res,
            next
        };

        core.getHomePage(dependencies);
    }
}

export default Controller;