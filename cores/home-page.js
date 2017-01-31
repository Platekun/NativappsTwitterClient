const Core = {
    getHomePage({req, res, next}) {
        res.sendFile('index.html');
    }
};

export default Core;