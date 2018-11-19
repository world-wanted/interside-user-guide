const HOME_STEP = "home";

const DESKTOP_STEPS = ["desktop_sign_up", "desktop_sign_in", "desktop_sign_in_2", "desktop_home_feed", "desktop_home_feed_2", "desktop_home_feed_3", "desktop_home_feed_4", "desktop_visa_insights", "desktop_visa_insights_2", "desktop_visa_insights_3", "desktop_visa_insights_4", "desktop_videos_resources", "desktop_videos_resources_2", "desktop_jobs", "desktop_jobs_2", "desktop_jobs_3", "desktop_checklists", "desktop_career_gameplan", "desktop_career_gameplan_2", "desktop_country_insights", "desktop_interview_tracker", "desktop_interview_tracker_2", "desktop_interview_tracker_3", "desktop_notifications", "desktop_exit"];

const MOBILE_STEPS = ["mobile_sign_up", "mobile_sign_in", "mobile_home_feed", "mobile_home_feed_2", "mobile_home_feed_3", "mobile_home_feed_4", "mobile_home_feed_5", "mobile_visa_insights", "mobile_visa_insights_2", "mobile_visa_insights_3", "mobile_visa_insights_4", "mobile_videos_resources", "mobile_videos_resources_2", "mobile_jobs", "mobile_jobs_2", "mobile_checklists", "mobile_career_gameplan", "mobile_career_gameplan_2", "mobile_country_insights", "mobile_country_insights_2", "mobile_interview_tracker", "mobile_interview_tracker_2", "mobile_interview_tracker_3", "mobile_notifications", "mobile_exit"];

const PAGE_DESCRIPTION = {
  sign_up: "Enter your university email address to sign-up",
  sign_in: "Use your university email address and password selected during the sign-up process",
  sign_in_2: "Update your interstride profile", 
  home_feed: "View curated articles on Career, Jobs, Companies, Visas & Immigration",
  home_feed_2: "Search for topics that are relevant to you",
  home_feed_3: "Like, comment, share, and bookmark posts",
  home_feed_4: "Post new ideas and content with your international student community",
  home_feed_5: "Access your bookmarked articles",
  visa_insights: "Select relevant filters to visualize H1B and Green Card sponsoring companies",
  visa_insights_2: "View number of petitions and salary information for visa sponsoring companies",
  visa_insights_3: "Click on each bar to learn in-depth about the company",
  visa_insights_4: "Enable maps view to visualize location information",
  videos_resources: "Select a folder or search for relevant content",
  videos_resources_2: "Access all the content directly on your phone",
  jobs: "Search for domestic or international jobs",
  jobs_2: "Refine results using custom filters",
  checklists: "Use default checklists or create your own checklist",
  career_gameplan: "Take the Career Gameplan Questionnaire",
  career_gameplan_2: "Review your customized assessment results",
  country_insights: "Choose from over 200+ countries",
  country_insights_2: "View in-depth country reports, including cost-of-living, culture, travel and health advisory information",
  interview_tracker: "Review all your upcoming networking and interview activity",
  interview_tracker_2: "Click on each meeting to view details",
  interview_tracker_3: "Record all new appointments",
  notifications: "View push notifications on important alerts and deadlines from Interstride"
}

const SCREENSHOT_IMG_SIZE = { width: 1066, height: 609};
const THREE_ARROW_POSITION = {
  sign_up: {x: 630, y:325},
  sign_in: {x: 595, y:380},
  home_feed: {x: 602, y:35},
  visa_insights: {x: 661, y:35 },
  videos_resources: {x: 713, y:35},
  jobs: {x: 749, y:35},
  country_insights: {x: 800, y:35},
  notifications: {x: 851, y:35},
  career_gameplan: {x: 302, y:258},
  checklists: {x: 302, y:301},
  interview_tracker: {x: 302, y:345}
};

const MOBILE_SCREENSHOT_IMG_SIZE = { width: 370, height: 751};
const MOBILE_THREE_ARROW_POSITION = {
  sign_up: {x: 342, y:440},
  sign_in: {x: 342, y:418},
  home_feed: {x: 80, y:621},
  visa_insights: {x: 159, y:619},
  videos_resources: {x: 222, y:619},
  jobs: {x: 281, y:621},
  country_insights: {x: 260, y:108},
  notifications: {x: 260, y:108},
  career_gameplan: {x: 250, y:108},
  checklists: {x: 250, y:108},
  interview_tracker: {x: 260, y:108}
};

var THREE_ARROW_TIME_OUT = null;
var current_step = HOME_STEP;
// var current_step = "desktop_exit";
// var current_step = "mobile_exit";
changePage();

function changePage() {
  if (current_step == HOME_STEP) {
    $(".home-screen").css("display", "block");
    $(".detail-screen").css("display", "none");
  }
  else {
    $(".home-screen").css("display", "none");
    $(".detail-screen").css("display", "block");              
  }    

  if (current_step.indexOf("exit") > -1) {
    $(".exit").css("display", "none")
    $(".mobile_exit").css("display", "block");
    $(".desktop").css("display", "none");
    $(".mobile").css("display", "none");
    return;
  }
  else {
    $(".exit").css("display", "none");
  }
  $(".three-arrow-img").css("display", "none");
  if (THREE_ARROW_TIME_OUT) {
    clearTimeout(THREE_ARROW_TIME_OUT);
  }

  if (current_step != HOME_STEP) {
    $(".home-screen").css("display", "none");
    $(".detail-screen").css("display", "block");        
    if (window.visualViewport.width >= 768) {
      $(".detail-screen.responsiveness").css("display", "none");        
    }
    else {
      $(".detail-screen.responsiveless").css("display", "none");        
    }
    
    if (isDesktopMode()) {
      $(".desktop").css("display", "block");
      $(".mobile").css("display", "none");
    }
    else {
      $(".desktop").css("display", "none");
      $(".mobile").css("display", "block");        
    }

    var folder_name = "desktop";
    if (isMobileMode()) {
      folder_name = "mobile";
    }
    
    $(".page-img").attr("src", "assets/" + folder_name + "/" + current_step + ".png");      

    var title = current_step.replace('desktop_', '').replace('mobile_', '').replace('_2', '').replace('_3', '').replace('_4', '').replace('_5', '').replace('_', ' ');
    title = title.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
    $(".page-title").html(title)

    $(".page-description").html(PAGE_DESCRIPTION[current_step.replace('desktop_', '').replace('mobile_', '')]);
    $(".mobile-page-description").html(PAGE_DESCRIPTION[current_step.replace('desktop_', '').replace('mobile_', '')]);
    if (PAGE_DESCRIPTION[current_step.replace('desktop_', '').replace('mobile_', '')].length > 60) {
      if (isMobileMode()) {
        $(".page-description").css("width", "26vw")
      }
      else {
        $(".page-description").css("width", "22vw")
      }
    }
    else {
      $(".page-description").css("width", "17.44vw")
    }
    if ($(".page-description").height() > 100) {
      $(".page-description").css("margin-top", 80 - $(".page-description").height() + "px")
    }
    else {
      $(".page-description").css("margin-top", "0px")        
    }

    showThreeArrow();
  }
}

function isDesktopMode() {
  return (current_step.indexOf('desktop') > -1);
}

function isMobileMode() {
  return (current_step.indexOf('mobile') > -1);
}

function getNextStep(type = null) {
  if (current_step == "home") {
    if (type == "mobile") {
      return MOBILE_STEPS[0];
    }
    else {
      return DESKTOP_STEPS[0];
    }
  }
  else {
    if (isDesktopMode()) {
      if (DESKTOP_STEPS.indexOf(current_step) < DESKTOP_STEPS.length - 1) {
        return DESKTOP_STEPS[DESKTOP_STEPS.indexOf(current_step) + 1];
      }
      else {
        return HOME_STEP;
      }
    }
    else {
      if (MOBILE_STEPS.indexOf(current_step) < MOBILE_STEPS.length - 1) {
        return MOBILE_STEPS[MOBILE_STEPS.indexOf(current_step) + 1];
      }
      else {
        return HOME_STEP;
      }
    }
  }
}

function getPrevStep() {
  if (isDesktopMode()) {
    if (DESKTOP_STEPS.indexOf(current_step) > 0) {
      return DESKTOP_STEPS[DESKTOP_STEPS.indexOf(current_step) - 1];
    }
    else {
      return HOME_STEP;
    }
  }
  else {
    if (MOBILE_STEPS.indexOf(current_step) > 0) {
      return MOBILE_STEPS[MOBILE_STEPS.indexOf(current_step) - 1];
    }
    else {
      return HOME_STEP;
    }
  }
}

function gotoNextStep() {
  if (current_step == HOME_STEP) {
    if ($('.view-type:checked').val() == "desktop") {
      current_step = getNextStep("desktop");      
    }
    else {
      current_step = getNextStep("mobile");              
    }
  }
  else {
    current_step = getNextStep();      
  }
  changePage();
}

function gotoPrevStep() {
  if (current_step == HOME_STEP) {
    current_step = HOME_STEP   
  }
  else {
    current_step = getPrevStep();      
  }
  changePage();
}

function hasNumber(myString) {
  return /\d/.test(myString);
}

function showThreeArrow() {
  if (!hasNumber(current_step)) {

    var module_name = current_step.replace('desktop_', '').replace('mobile_', '').replace('_2', '').replace('_3', '').replace('_4', '').replace('_5', '');

    var positions = THREE_ARROW_POSITION;
    var screen_size = SCREENSHOT_IMG_SIZE;
    if (isMobileMode()) {
      positions = MOBILE_THREE_ARROW_POSITION;
      screen_size = MOBILE_SCREENSHOT_IMG_SIZE;        
    } 

    $(".three-arrow-img").css("left", positions[module_name].x / screen_size.width * 100 + "%");
    $(".three-arrow-img").css("top", positions[module_name].y / screen_size.height * 100 + "%");

    $(".three-arrow-img").css("display", "block");
    THREE_ARROW_TIME_OUT = setTimeout(function(){ 
      $(".three-arrow-img").css("display", "none"); 
    },3000);      
  }
}

function gotoMobile() {
  current_step = MOBILE_STEPS[0];
  changePage();
}

function gotoDesktop() {
  current_step = DESKTOP_STEPS[0];
  changePage();
}

function gotoHome() {
  current_step = HOME_STEP;
  changePage();    
}

$( document ).on('turbolinks:load', function() {
  $(".next-page").on('click', gotoNextStep);
  $(".prev-page").on('click', gotoPrevStep);
  $(".goto-mobile").on('click', gotoMobile);
  $(".goto-desktop").on('click', gotoDesktop);
  $(".goto-home").on('click', gotoHome);
});

