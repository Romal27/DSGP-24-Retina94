from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet

STAGE_MAPPING = {
    "no dr": "no dr",
    "mild npdr": "mild",
    "mild dr": "mild",
    "moderate npdr": "moderate",
    "moderate dr": "moderate",
    "severe npdr": "severe",
    "severe dr": "severe",
    "proliferative dr": "proliferative",
    "pdr": "proliferative"
}

class ActionSuggestHealthyFood(Action):
    def name(self) -> Text:
        return "action_suggest_healthy_food"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        response = (
            "Hey! Here’s some yummy, diabetes-friendly foods to keep you and your eyes happy:\n"
            "- **Whole grains**: Brown rice or oats—steady energy, no spikes.\n"
            "- **Leafy greens**: Spinach or kale, packed with eye goodies.\n"
            "- **Nuts & seeds**: Almonds or chia—healthy fats in a handful.\n"
            "- **Low-sugar fruits**: Berries or apples, sweet and smart.\n"
            "- **Lean proteins**: Chicken, fish, or tofu—power without the rush.\n"
            "- **Beans & legumes**: Lentils or chickpeas, slow-release fuel.\n"
            "- **Low-fat dairy**: Greek yogurt or skim milk—calcium done right.\n"
            "Skip sugary drinks and fried stuff—they’re trouble! Want easy meal ideas?"
        )
        dispatcher.utter_message(text=response)
        return [SlotSet("last_question_context", "ask_healthy_food")]

class ActionExplainDrStage(Action):
    def name(self) -> Text:
        return "action_explain_dr_stage"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        stage = tracker.get_slot("dr_stage")
        if not stage:
            response = "Hey, I don’t know your DR stage yet! Tell me—like ‘mild NPDR’ or ‘no DR’—and I’ll fill you in!"
            dispatcher.utter_message(text=response)
            return []

        stage = stage.lower().strip()
        normalized_stage = next((value for key, value in STAGE_MAPPING.items() if key in stage), None)

        if not normalized_stage:
            response = "Hmm, I’m not sure about that stage. Could you say it like ‘mild NPDR’ or ‘proliferative DR’?"
            dispatcher.utter_message(text=response)
            return []

        if normalized_stage == "no dr":
            response = (
                "Awesome! *No DR* means your eyes are retinopathy-free so far. "
                "Keep up the good habits and eye checks to stay that way. "
                "Want to know how often to screen?"
            )
        elif normalized_stage == "mild":
            response = (
                "Alright, *Mild NPDR* is the first nudge—tiny swellings (microaneurysms) start in your retina’s vessels. "
                "Vision’s usually good, but diabetes control is your ace. "
                "Want to know what to watch for next?"
            )
        elif normalized_stage == "moderate":
            response = (
                "Got it, *Moderate NPDR* ups the ante—more damage, maybe leaks, and a bit of blur might creep in. "
                "Checkups and control are your wingmen. "
                "Want tips to keep it steady?"
            )
        elif normalized_stage == "severe":
            response = (
                "*Severe NPDR* is serious—blocked vessels mean your retina’s gasping for air. "
                "It’s subtle now, but lasers might help. "
                "Want to know what’s next if it grows?"
            )
        elif normalized_stage == "proliferative":
            response = (
                "*Proliferative DR* is the big one—new, fragile vessels sprout, bleed, or scar, threatening your sight. "
                "Lasers or shots are clutch. "
                "Want the scoop on those?"
            )

        dispatcher.utter_message(text=response)
        followup_context = {
            "no dr": "ask_screening_frequency",
            "mild": "ask_symptoms_for_stage",
            "moderate": "ask_treatment_for_stage",
            "severe": "ask_progression_for_stage",
            "proliferative": "ask_treatment_for_stage"
        }.get(normalized_stage, None)
        return [SlotSet("last_question_context", followup_context)]

class ActionHandleAffirmFollowup(Action):
    def name(self) -> Text:
        return "action_handle_affirm_followup"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        context = tracker.get_slot("last_question_context")
        dr_stage = tracker.get_slot("dr_stage")
        normalized_stage = next((value for key, value in STAGE_MAPPING.items() if key in dr_stage.lower()), None) if dr_stage else None

        if context == "ask_screening_frequency":
            response = (
                "Great! With *No DR*, aim for a yearly eye check. If blurriness or anything odd pops up, go sooner. "
                "Want to know what those exams involve?"
            )
        elif context == "ask_treatment_for_stage" and normalized_stage:
            if normalized_stage == "mild":
                response = (
                    "Cool! For *Mild NPDR*, it’s all about stability—keep blood sugar, pressure, and cholesterol in check. "
                    "No big treatments yet, just regular peeks. Want control tips?"
                )
            elif normalized_stage == "moderate":
                response = (
                    "Nice! *Moderate NPDR* means more eye checks, maybe early lasers for leaks. "
                    "Diabetes control’s still king—want some hacks?"
                )
            elif normalized_stage == "severe":
                response = (
                    "Okay, *Severe NPDR* might need lasers to zap problem vessels and protect your sight. "
                    "Injections could help too. Want the details?"
                )
            elif normalized_stage == "proliferative":
                response = (
                    "Heads up! *Proliferative DR* needs fast action—lasers, injections, or surgery to save your vision. "
                    "Want me to explain those?"
                )
        elif context == "ask_symptoms_for_stage":
            response = (
                "Sure! If *Mild NPDR* climbs, watch for blurry spots or dim-light trouble. "
                "Catching it early rocks—want to know how?"
            )
        elif context == "ask_progression_for_stage":
            response = (
                "Alright! If *Severe NPDR* rolls on, it hits *Proliferative DR*—new vessels bleed and can blur things fast. "
                "Want ways to slow that down?"
            )
        elif context == "ask_healthy_food":
            response = (
                "Love it! Try oatmeal with berries or salmon with spinach—tasty and good for you! "
                "Want more swaps?"
            )
        elif context == "ask_dr_progression_speed":
            response = (
                "Screening’s your best bet! Yearly for mild, more if it’s active—keeps you ahead of the game. "
                "Want to know what they check?"
            )
        else:
            response = "Awesome! What’s next on your mind—stages, symptoms, or something else?"
        dispatcher.utter_message(text=response)
        return []

class ActionHandleVagueFollowup(Action):
    def name(self) -> Text:
        return "action_handle_vague_followup"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        context = tracker.get_slot("last_question_context")

        if context == "ask_treatment_for_stage":
            response = "I covered your stage—want to dive into treatments or something else about it?"
        elif context == "ask_retina_symptoms":
            response = "Happy to dig in! Blurriness or floaters might show up—want early spotting tips?"
        elif context == "ask_treatment_options":
            response = "Lasers fix leaks, injections calm things—cool, right? Which one interests you?"
        elif context == "ask_risk_factors":
            response = "High sugar and BP are big ones—want easy ways to manage them?"
        elif context == "ask_screening_methods":
            response = "Screening’s your lookout! Want how-often details or test breakdowns?"
        elif context == "ask_vision_loss_risk":
            response = "Sight’s at risk if DR runs wild—want signs to catch it early?"
        elif context == "ask_is_reversible":
            response = "Early DR can pause with care—want tips to stop it cold?"
        elif context == "ask_healthy_food":
            response = "Those foods rock! Want recipes or daily hacks?"
        else:
            response = "Love to keep going—what’s next? Stages, symptoms, or something new?"
        dispatcher.utter_message(text=response)
        return []

class ActionExplainSymptoms(Action):
    def name(self) -> Text:
        return "action_explain_symptoms"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        response = (
            "Here’s what DR might toss your way:\n"
            "- **Blurry vision**: Things get fuzzy.\n"
            "- **Floaters**: Dark specks float by.\n"
            "- **Night trouble**: Low light gets hard.\n"
            "- **Vision loss**: Late-stage risk if ignored.\n"
            "Noticing any yet? Want early detection tips?"
        )
        dispatcher.utter_message(text=response)
        return [SlotSet("last_question_context", "ask_retina_symptoms")]

class ActionExplainScreening(Action):
    def name(self) -> Text:
        return "action_explain_screening"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        response = (
            "Screening’s your DR sleuth! Here’s the lineup:\n"
            "- **Dilated exam**: Drops widen pupils for a retina look.\n"
            "- **Fundus photos**: Pics of your eye’s back.\n"
            "- **OCT**: Detailed retina scans.\n"
            "- **Angiography**: Dye spots leaks in tough cases.\n"
            "Want to know how often or what it’s like?"
        )
        dispatcher.utter_message(text=response)
        return [SlotSet("last_question_context", "ask_screening_methods")]

