function resultCardTemplate(activityToken, socketID, brand, price, note, distance, duration) {
  return ` 
    <div class='resultCard' id=${socketID} onmouseenter = 'resultMouseEnter(event)' onmouseleave = 'resultMouseLeave(event)' >
        <div style='position: relative ; width: 100% ; height: 80px;display:flex; flex-direction: column; text-align:left ; justify-content: center;padding-left: 15px;border-bottom:1px solid rgba(0, 0, 0, 0.1)'>
            <p style='margin:0 ;font-size: 20px;font-weight: 800;'>${brand} </p>
            <p style='margin:0 ; font-size: 15px;font-weight: 600 ;color:rgba(0, 0, 0, 0.5);'>${price.toLocaleString()} VND/hour</p>
        </div>
        <div id='result-detail-card'>
        
            <p class='result-detail-header'>
                Note
            </p>
            <p style='margin-left:5px;margin-top:0;font-size:12px;font-weight: 400; color:rgba(0, 0, 0, 0.5)'>${note}</p>
            <p  class='result-detail-header'>
                Distance 
            </p>
            <p style='margin-left:5px;margin-top:0;font-size:12px;font-weight: 400; color:rgba(0, 0, 0, 0.5)'>About ${distance} km </p>
            <p  class='result-detail-header'>
                Duration
            </p>
            <p style='margin-left:5px;margin-top:0;font-size:12px;font-weight: 400; color:rgba(0, 0, 0, 0.5)'>Take ${duration} minutes </p>
        
        </div>
        <div style = 'height: 1px ; width:100%; background-color : rgba(0, 0, 0, 0.1) ; margin-bottom:10px;margin-top:0px;'></div>
        <div style="display: flex; justify-content: center;align-items: center; width:100% ; height:20px">
            <button class="resultApprove" activityToken='${activityToken}' value=${socketID} onclick='resultApprove(event)'>Appove</button>
        </div>
        
    </div>
    `;
}

function notificationCardTemplate(activityToken, modeColor, item, distance) {
  return ` 
        <div class='notiCard' isClosed="true" id=${activityToken}>
            <div class="enmergencyMode" style ='background-color: ${modeColor};'> </div>
            <div style = 'width:300px ; height: 80px ; display: flex ;justify-content: center; position: relative; top:15px;left:15px; '>
                <div style='width:200px;position: relative; display: flex ; flex-direction : column;justify-content: left'>
                    <p style='margin:5px;font-size: 20px;font-weight: 800'>${item}</p>
                    <p style='margin:5px;font-size:12px;font-weight: 400; color:rgba(0, 0, 0, 0.5)'>About ${distance} km away </p>
                </div>
                <div style='height:100%;display: flex;flex-direction: column; justify-content: right;position: relative; margin-right:0;margin-top:5px'>
                    <button class="approve" value=${activityToken} onclick='notiApprove(event)'>Appove</button>
                    <button class="decline" value=${activityToken} onclick='notiDecline(event)'>Decline</button>
                </div>
            </div>

            <div id='detail-card'>
                <div style = 'height: 1px ; width:300px; background-color : rgba(0, 0, 0, 0.1) ; margin-bottom:10px;margin-left:-20px'></div>
                <p id='brand-text' class='detail-header'>
                    Brand
                </p>
                <input class="detail-input" type="text" id="brand" placeholder="Product's Brand" />

                <p id='price-text' class='detail-header'>
                    Price per a hour
                </p>
                <input class="detail-input" type="text" id="price" placeholder="Price" oninput='onInput_Price()'/>
        
                <p id='note-text' class='detail-header'>
                    Note
                </p>
                <input class="detail-input" type="text" id="note" placeholder="Less than 50 Characters" />
            </div>
        </div>
        `;
}

function activityCardTemplate(activityToken,name,brand,phone,price,note,distance,duration) {
  return `
    <div id='${activityToken}-activities-card' activityToken='${activityToken}' class='activities-recent-card' isClosed="true">
    <div class='activities-title' activityToken='${activityToken}' onclick="activityCardClick(event)"> 
      <p style='width: 230px; font-size: 20px;font-weight: 800'>${brand}</p>
      <img activityToken='${activityToken}' onclick="activityMessageClick(event)" style='width:30px;height:30px'
        src="/Searching/images/message.png" alt="">
    </div>

    <div id='${activityToken}-activities-detail' class='activities-detail-card' isClosed="true">

      <p class='activities-detail-header'>
        Name:<span
          style='margin-left:5px;margin-top:0;font-size:12px;font-weight: 400; color:rgba(0, 0, 0, 0.5)'>${name}
        </span>
      </p>
      <p class='activities-detail-header'>
        Phone:<span
          style='margin-left:5px;margin-top:0;font-size:12px;font-weight: 400; color:rgba(0, 0, 0, 0.5)'>${phone}
        </span>
      </p>
      <p class='activities-detail-header'>
        Price:<span
          style='margin-left:5px;margin-top:0;font-size:12px;font-weight: 400; color:rgba(0, 0, 0, 0.5)'>${price}
          VND/Hour
        </span>
      </p>
      <p class='activities-detail-header'>
        Note:<span
          style='margin-left:5px;margin-top:0;font-size:12px;font-weight: 400; color:rgba(0, 0, 0, 0.5)'>${note}
        </span>
      </p>

      <p class='activities-detail-header'>
        Distance:<span
          style='margin-left:5px;margin-top:0;font-size:12px;font-weight: 400; color:rgba(0, 0, 0, 0.5)'>${distance}
          km </span>
      </p>

      <p class='activities-detail-header'>
        Duration:<span
          style='margin-left:5px;margin-top:0;font-size:12px;font-weight: 400; color:rgba(0, 0, 0, 0.5)'>${duration}
          minutes </span>
      </p>
      <div
        style='width: 100%; display:flex; justify-content: center ; align-items: center ; border-top: 1px solid rgba(0, 0, 0, 0.05)'>
        <button activityToken='${activityToken}'
          style='position: relative; border:none; font-size: 17px; font-weight: 300;color:#FF0800 ; background-color:transparent; margin:10px'>Cancel</button>
      </div>

    </div>


    <div id='${activityToken}-activities-message' class='activities-message-card' isClosed="true">
      <div id = '${activityToken}-activities-message-container' class='activities-message-container'>

      </div>
      <div class='activities-message-button' >
        <input id = '${activityToken}-activities-message-input'type='textarea' class='activities-message-text' placeholder='Message here' />
        <button activityToken='${activityToken}'
          style='width: 20%; height: 30px; font-weight:5800; border: none; background-color:#B8D8D8 ; color: white ;border-radius:15px'
          onclick="activityMessageSend(event)">SEND</button>
      </div>
    </div>
  </div>`
}

function ownerMessageTemplate(message) {
  return `
    <div class='activities-owner-message'>
      <div >
       ${message}
      </div>
    </div>`;
}

function guestMessageTemplate(message) {
  return `
    <div class='activities-guest-message'>
      <div >
       ${message}
      </div>
    </div>`;
}

function suggestionTemplate(text){
  return `<button class='suggestion' value=${text} onclick ='sugesstionClick(event)' >
  ${text}
  </button>
  `
}