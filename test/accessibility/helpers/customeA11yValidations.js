
class CustomValidations{

    async mainContentLandmark(page,issues){
        if(await page.$('main') === null){
            issues.push(
                this.getIssueDetailsObj("main" , "Landmarks","main landmark missing in page", "main","main")
            );
        }
    }

    async skipContentLink(page, issues){
        if (await page.$('.govuk-skip-link') === null) {
            issues.push(
                this.getIssueDetailsObj("Skip link", "Navigation", "Skip link to main content is missing", "a", "a")
            );
        }

    }

    getIssueDetailsObj(code,type,message,selector,context){
        return {
            code:code ,
            type:type,
            message:message ,
            selector:selector,
            context:context
        };

    }
}

module.exports = new CustomValidations(); 