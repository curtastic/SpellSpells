"use strict"

/* I have my server doing this instead now, because the SDK is too big.
var storage_1 = require("thirdweb/storage")
var thirdweb_1 = require("thirdweb")
var client = (0, thirdweb_1.createThirdwebClient)({
	secretKey: "<moved to curtastic.com server>",
})
async function gFetchFromThirdweb(){
	var file  = await (0, storage_1.download)({
		client: client,
		uri: "ipfs://QmbL7RFBtKXr7KXEaAWA1sgLxHkUV2wtk2NEfNadTLibhF",
	})
	file.text().then(gWordsFromThirdweb)
}
*/
var gWordsFromThirdweb = (text) => {
	if(text && text[0] == ',') {
		gWords9 = text
		gDivHide(gCastRealDiv)
		gStateSet(gStateChest)
	}
}

var gOnMouseDown,gOnMouseUp,gOnMouseMove,gMouseMoved,gMouseDownX,gMouseDownY,gMouseDown,
	gWords9,
	gMuted,
	gState,
	gStateLoading=1,gStateBattle=2,gStateChest=3,gStateTown=4,gStateMonDead=5,gStateWin=6,
	gState2='',
	gMusic,
	gSizeX=0, gSizeY=0, gPxToRem=1, gGameX=0,
	gYouHp,gMonHp=0,
	gMonDamage=0,
	gDamageHi,
	gDamageHiWord,
	gLettersHi,
	gLettersHiWord,
	gDay,
	gTurn=0,
	gGold,
	gTileId,
	gSelRune,
	gTileDeleteCost,
	gTileUpgradeCost,
	gHealCost,
	gSpellTexts,
	gTiles,
	gTownRunes=[],
	gTownElfTiles=[],
	gWandRunes,
	gSpellTiles,
	gSpellLast='',
	gBagTiles,
	gChestTiles=[],
	gHandTiles,
	gTrashTiles,
	gTileKindTile=1,
	gTileKindRune=2,
	gMonPics='🦟,🐍,🕷,🦂,🧟,🐊,👺,👹,🧛,👻,👽,🦖,🐉'.split(','),
	gRunes='',
	gRuneInfos=`🆙 Up Button
Upgrades a random letter in your final spell
🅰 Blood Type A
A's steal health
🅱 Blood Type B
B's steal health
🅾 Blood Type O
O's steal health
🆖 NG Button
2x word score on spells with ING
🧀 Cheese
2x word score on spells with EE
🌕 Full Moon
2x word score on spells with OO
™ Trademark
2x word score on your most used spell
♻ Recycling
Discard 1 then draw 1 letter each turn
🧰 Toolbox
Start each battle with an extra letter
💸 Money With Wings
Enemies drop 33% more money
📓 Notebook
2x word score on spells you've never cast
🧮 Abacus
Rounds your damage up to the nearest 10
🖍 Crayon
Every turn a random letter gets 2x score
🥇 1st Place Medal
2x letter score on spell's 1st letter
🥈 2nd Place Medal
2x letter score on spell's 2nd letter
🥉 3rd Place Medal
2x letter score on spell's 3rd letter
🏁 Chequered flag
2x letter score on the spell's last letter
🎰 Slot Machine
3x word score and ❤100 on 7 letter spells
⏰ Alarm Clock
2x word score on turn 3
🤐 Zipper mouth
2x word score if you didn't cast last turn
👶 Babyface
2x word score on spells with 2 or 3 letters
🤬 Face With Symbols
2x word score on 4 letter spells
🤓 Nerd Face
2x word score on 6+ letter spells
👸 Queen Face
Q's get automatic U after them
🥂 Clinking Glasses
2x letter score on letters used twice
🧷 Safety Pin
When discarding your hand, keep 1 letter
🗄 Filing Cabinet
2x letter score on kept letters
🖇 Linked Paperclips
2x words score on spells with 2+ paperclips
⌛ Hourglass Done
2x word score from turn 5 onwards
💪 Flexed Biceps
2x word score when your health is 50+
🩹 Bandage
Heal 10 when battle starts
🩺 Stethoscope
Healing heals you 2x
💉 Syringe
Healing yourself also damages the enemy`.split(`
`),
	gLetterPoints = [1,4,4,2,1,4,3,3,1,10,5,2,4,2,1,4,12,1,1,1,2,6,4,8,3,10],
	w = window, d = document,
	//gLog = console.log.bind(console),
	u

/*🎨 Artist palette
2x damage a letter in each spell
💬 Speech Balloon
Increases your hand size by 1
⚔ Crossed Swords
Cast a 2nd spell with your extra letters
🛡 Shield
Blocks the first enemy attack
🧲 Magnet
Get back 1 letter after you cast a spell
🔭 Telescope
See the damage your opponent will deal
🆘 SOS Button
+♥30 the 1st time you'd die each night
*/

w.onload = _ => {
	gGameDiv.innerHTML = `
<div style='padding:2rem 6rem;display:flex;justify-content:space-between;width:100%'>
	<div style="position:relative">
		<div class=iosoutline style="position:absolute;font-size:11rem;left:-4rem;top:-3.5rem">❤</div>
		<span id=gHpDiv style="background:#EEC;color:#222;border-radius:9em;border:1rem solid #000;font-size:5rem;padding:.2rem 6rem .3rem 11rem"></span>
	</div>
	<div style='position:relative'>
		<div style="position:absolute;font-size:11rem;left:-4rem;top:-3.5rem">🌞</div>
		<span id=gDayDiv style="background:#EEC;color:#222;border-radius:9em;border:1rem solid #000;font-size:5rem;padding:.2rem 6rem .3rem 11rem"></span>
	</div>
	<div style='position:relative'>
		<div style="position:absolute;font-size:10rem;left:-4rem;top:-3rem">💰</div>
		<span id=gGoldDiv style="background:#EEC;color:#222;border-radius:9em;border:1rem solid #000;font-size:5rem;padding:.2rem 6rem .3rem 11rem"></span>
	</div>
</div>
<div id=gRunesDiv style='max-width:77rem;align-items:center;display:flex;border:1rem solid #000;padding:.5rem 2rem;background:linear-gradient(0,#fa5 0%,#d83 20%,#d83 60%,#fa5 100%);font-size:4rem;height:12.5rem;border-top-left-radius:6rem;border-bottom-left-radius:6rem;position:relative;left:7rem;transform:scaleX(1.18)'></div>
<div style='position:absolute;font-size:6rem;right:0;top:1rem;width:5rem;text-align:right;cursor:pointer' id=gMuteButton>🔊</div>
<div id=gRuneInfoDiv style='display:none;position:absolute' class=speech><div></div></div>
<button id=gRuneSellButton style='display:none;z-index:4;position:absolute;font-size:3.5rem'></button>
<div id=gLoadDiv style='position:absolute;inset:0;top:31rem;font-size:8rem'>
	<div style='margin-bottom:7rem'>Spell Spells is a word game. You need to make words with limited letters.</div>
	<button id=gPlayFullButton style='font-size:6rem;padding:3rem 6rem'>Play with full dictionary<div style='font-size:67%;font-style:italic'>Load from the Thirdweb blockchain</div></button>
	<div style='font-size:5rem;margin:3rem'>OR</div>
	<button id=gPlayHonorsButton style='font-size:6rem;padding:3rem 6rem'>Play using honor's system<div style='font-size:52%;font-style:italic'>Game won't know if your word is real, don't cheat!</div></button>
</div>
<div id=gIntroDiv style='display:none;position:absolute;inset:0;top:24rem'>
	<div style='display:flex;align-items:flex-end;padding-bottom:14rem'>
		<div class=iosoutline style='font-size:15rem;position:relative;top:22rem'>👵</div>
		<div style='position:relative;top:-35rem;left:-14rem;flex-grow:1'>
			<div id=gSpeechDiv class=speech style='position:absolute;left:9rem;font-size:5rem;color:#222;top:14rem'><div></div></div>
		</div>
	</div>
	<div id=gChestDiv style='cursor:pointer;position:relative;top:0;opacity:1;transition:all .5s ease'>
		<div style='width:50rem;height:64rem;margin:0 auto 4rem;position:relative;perspective:200rem;border-radius:.4rem;background:#688;border-bottom:1rem solid #486;box-shadow:0 .8rem 0 #060'>
			<div id=gBookCoverDiv style='position:absolute;z-index:3;left:.8rem;right:0;height:59.3rem;color:#fc1;padding:18rem 4rem 0 2rem;font-size:11rem;border-top-right-radius:.4rem;border-bottom-right-radius:.4rem;background:radial-gradient(#ac9, #483);text-shadow:0 -1px 0 #FED, 0 1px 0 #050;line-height:.9;letter-spacing:-1rem;font-family:serif;font-weight:normal;transform-origin:left;transition:transform .5s ease;border-bottom:1px solid #393;box-shadow:0 1rem 0 #060'>
				<div style='position:absolute;border:.6rem solid #fc1;border-top-left-radius:99em;border-top-right-radius:99em;inset:3rem'></div>
				<div style='position:absolute;border:.3rem solid #fc1;border-top-left-radius:99em;border-top-right-radius:99em;inset:4rem'></div>
				<div style='position:absolute;border:.6rem solid #fc1;inset:2.3rem'></div>
				<div id=gClubsDiv></div>
				<div style="position:absolute;top:3.7rem;font-size:6rem;letter-spacing:1rem;text-shadow:none;left:4rem">§</div>
				<div style="position:absolute;top:3.7rem;font-size:6rem;letter-spacing:1rem;text-shadow:none;right:4rem">§</div>
				<div style="position:absolute;top:6rem;font-size:8rem;letter-spacing:1rem;text-shadow:none;right:0;left:0">†</div>
				SPELL<br>SPELLS
				<div>
					<div style='font-size:4rem;text-shadow:none;margin-top:2rem'><div style='display:inline-block;width:4rem;rotate:90deg;transform:scaleY(-1)'>†</div><div style='rotate:90deg;display:inline-block;width:4rem'>†</div></div>
					<div style='font-size:4rem;letter-spacing:0;margin-top:2rem'>Curtastic Corp</div>
				</div>
			</div>
			<div id=gBookPageDiv style='font-family:serif;line-height:.95;width:98%;height:95%;border-top-right-radius:.4rem;background:radial-gradient(#fee, #edc);border-left:1rem solid #486;color:#111;padding:4rem 0 4rem 6rem;font-size:9rem;text-align:left'>
			</div>
			<div style='width:98%;height:5%;border-bottom-right-radius:.4rem;background:repeating-linear-gradient(#dcb, #dcb 1px, #ba9 2px);position:relative'>
				<div style='width:.8rem;height:154%;background:#363;position:absolute;top:-.7rem'></div>
			</div>
		</div>
	</div>
	<div id=gBookOpenDiv style='font-size:5rem;color:#FD6' class=glow>Press to open</div>
	<div id=gBookOpenDiv2 style='display:none;font-size:5rem;color:#FD6' class=glow>Press to read</div>
</div>
<div id=gTownDiv style='display:none'>
	<div id=gTownElfDiv style='font-size:20rem;position:absolute;left:1rem;top:35rem'><span class=iosoutline>🧝‍♂️</span><div class=speech style='left:15rem;bottom:20rem'><div></div></div></div>
	<div id=gTownMageDiv style='font-size:20rem;position:absolute;left:1rem;top:65rem'><span class=iosoutline>🧞</span><div class=speech style='left:15rem;bottom:20rem'><div></div></div></div>
	<button id=gTownRuneBuyButton style='display:none;position:absolute;left:74rem;top:74rem;font-size:4rem'></button>
	<div id=gTownWorkerDiv style='font-size:20rem;position:absolute;left:1rem;top:95rem'><span class=iosoutline>👨‍🔧</span><div class=speech style='left:15rem;bottom:20rem'><div></div></div></div>
	<div style='font-size:4rem;position:absolute;left:26rem;top:102rem'>
		<button id=gTownTileDeleteButton></button>
		<button id=gTownTileUpgradeButton></button>
		<button id=gTownHealButton></button>
	</div>
	<button id=gTownLeaveButton style='font-size:5rem;position:absolute;right:3rem;top:27rem'>Go<br>Battle!</button>
</div>
<div id=gYouDiv style='position:absolute;left:1rem;top:135rem;transition:all 1s ease'>
	<div class=iosoutline style='font-size:18rem;transform-origin:20% 99%;transition:all 1s ease'>🧙</div>
	<div style='font-size:5rem'>❤ <span id=gYouHpDiv></span></div>
</div>
<div id=gBattleDiv style='display:none;margin-top:9rem'>
	<div style='width:100%;text-align:right'>
		<div style='display:inline-block;position:relative;left:3rem;transform:translateX(100%);transition:all .3s ease-in;'>
			<div id=gMonDiv style='transition:all .3s ease-in;transform-origin:80% 99%'><div style='transform:none'></div></div>
			<div style='font-size:5rem;text-align:center'>❤ <span id=gMonHpDiv>100</span></div>
		</div>
	</div>
	<div id=gDeckDiv style='position:absolute;left:0;bottom:22rem;font-size:20rem'>🎒<div id=gDeckTilesDiv style='position:absolute;bottom:3rem;left:0;right:0'></div></div>
	<div id=gMonShotDiv style='position:absolute;left:100rem;top:56rem;font-size:12rem;transition:left .5s ease-out, top .5s ease-out'>🪓</div>
	<div id=gMonDamageDiv style='position:absolute;font-size:4rem'></div>
	<div id=gSpellTotalDiv style='font-size:12rem;color:#6A8;position:absolute;top:107rem;left:0;right:0'></div>
	<div style='position:absolute;top:126rem;left:0;right:0'>
		<button id=gCastButton style='font-size:7rem;padding:4rem 8rem' class=no>CAST</button>
		<div id=gCastRealDiv style='font-size:3rem'>Only use real words. Don't cheat!</div>
		<div id=gCastNoDiv style='font-size:4rem;color:#e22'></div>
	</div>
	<div id=gHealHeartDiv style='display:none;font-size:6rem;position:absolute;left:42rem;top:147rem;line-height:1.1;transition:left .5s ease-out, top .5s ease-out'>❤</div>
	<div id=gHealTotalDiv style='font-size:6rem;color:#6A8;position:absolute;left:50rem;top:147rem'></div>
	<div style='position:absolute;right:0;bottom:53rem'>
		<button id=gTurnSkipButton style='font-size:4rem;padding:2rem 3rem;float:right;margin-right:4rem'>Skip<br>Turn</button>
	</div>
	<div id=gTrashDiv style='position:absolute;right:0;bottom:21rem;font-size:21rem'>🗑<div id=gTrashTilesDiv style='position:absolute;bottom:4rem;left:0;right:0'></div></div>
</div>
<div id=gTownOverlay style='position:absolute;z-index:3;top:0;left:0;right:0;bottom:100%;background:rgba(0,0,0,.5)'></div>
<div id=gHandDiv style='display:none;position:absolute;bottom:4rem;left:0;right:0;font-size:4rem;height:15rem;background:#EC6;box-shadow:0 2rem 0 #CA0'>
	<div style='display:none;position:relative;top:-7.5rem;border-radius:99em;background:#393;color:#FFF;padding:.5rem 3rem'>Discard a letter</div>
</div>
<div id=gBagDiv style='position:absolute;width:100%;bottom:0;transition:all .2s ease;font-size:4rem;height:11rem'>
	<div id=gBagTextDiv style='position:absolute;inset:0;color:#888;border-radius:2rem;background:#ec3;border:1.5rem ridge #ec3;padding:1rem'>Your bag is empty</div>
	<div id=gBagTotalDiv style='position:absolute;bottom:calc(100% - 1.5rem);font-size:70%;left:3rem;border-top-left-radius:2rem;border-top-right-radius:2rem;background:#ec3;border:1.5rem ridge #ec3;border-bottom:none;padding:0 1rem 1rem 1rem;color:#222'>🎒 Your Bag</div>
</div>
<div id=gGameOverDiv style='border-radius:5rem;border:2rem ridge #000;position:absolute;inset:30rem 7rem;background:#000;transition:opacity 1s ease'></div>
<div id=gWinDiv style='border-radius:5rem;border:2rem ridge #000;position:absolute;inset:25rem 0 0 0;background:#000;transition:opacity 1s ease;font-size:6rem;padding:6rem'></div>
<div class=glow id=gMonDeadDiv style='position:absolute;inset:0;display:none'>
	<div id=gMonDeadGoldDiv style='transition:all .5s ease;cursor:pointer;position:absolute;font-size:11rem;white-space:nowrap'></div>
	<div style='font-size:6rem;margin-top:65rem'>Press to collect</div>
	<div id=gTileUpDiv style='font-size:6rem;margin-top:25rem'></div>
</div>
<button id=gRetryButton style='z-index:5;position:absolute;top:64%;left:50%;transform:translateX(-50%);font-size:6rem;padding:3rem 6rem;display:none'>Play Again</button>
<div id=gTilesDiv></div>
	`

	var styles = `
*{user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;outline:none;box-sizing:border-box}
button{cursor:pointer;padding:0;border:none;font-family:inherit;font-weight:inherit}
button{border-radius:2rem;background:linear-gradient(0,#5ef 0%,#2ab 10%,#2ab 80%,#5ef 100%);color:#FFF;font-size:inherit;padding:2rem 3rem;box-shadow:0 1rem 0 #067;position:relative}
button:active:enabled{box-shadow:0 1px 0px #000;transform:translateY(1rem);background:linear-gradient(0,#2ab 90%,#089 100%)}
button.no{filter:grayscale(100%)}
.sel>div:first-child {text-shadow: .5rem 1rem .2rem rgba(0,0,0,.5);transform:translateY(-.7rem)}
.use>div:first-child {text-shadow: 0 .1rem 1rem #0F0;transform:translateY(-.3rem)}
.speech{pointer-events:none;width:max-content;text-align:left;border:1rem solid #000;border-radius:7rem;position:absolute;padding:2rem 4rem;color:#222;font-size:4rem;z-index:2;box-shadow: 1rem 1rem 2rem rgba(0,0,0,.5)}
.speech::after{content:'';pointer-events:none;background:#CCB;border:1rem solid #000;border-top:none;width:4rem;height:4rem;position:absolute;left:1rem;bottom:-5rem;transform: skew(-40deg) scale(1,1.3);box-shadow:0 -.3rem 0 #AA9 inset}
.speech::before{content:'';position:absolute;inset:0;background: radial-gradient(#FFE, #CCB);border-radius: 6rem;border: .5rem ridge #DDC;border-style: outset}
.speech>div{position:relative}
@supports (-webkit-touch-callout: none){.iosoutline{text-shadow:0 .05rem 0 #000,0 -.05rem 0 #000,.05em 0 0 #000,-.05em 0 0 #000}}
.glow {animation:.8s ease 0s infinite forwards running glow}
@keyframes glow{0%{opacity:1}50%{opacity:.8}100%{opacity:1}}
.spin {animation:.2s linear 0s infinite forwards running spin}
@keyframes spin{0%{rotate:0deg}50%{rotate:-180deg}100%{rotate:-360deg}}
.cast{animation:.2s linear 0s 1 forwards running cast}
@keyframes cast{0%{transform:skewX(0deg)}50%{transform:skewX(-10deg)}100%{transform:skewX(0deg)}}
.dance{animation:.9s linear 0s infinite forwards running dance}
@keyframes dance{0%{transform:skewX(0deg) scaleY(.9)}25%{transform:skewX(10deg) scaleY(1.1)}50%{transform:skewX(0deg) scaleY(.9)}75%{transform:skewX(-10deg) scaleY(1.1)}100%{transform:skewX(0deg) scaleY(.9)}}
.hit,.healed {position:relative;animation:.2s linear 0s 1 forwards running hit}
.healed {animation-name:healed}
@keyframes healed{0%{transform:translateY(0) scaleY(1)}50%{transform:translateY(-1.5rem) scaleY(1.1);filter:saturate(1.5)}100%{transform:translateY(0) scaleY(1)}}
@keyframes hit{0%{left:0}50%{left:1rem;filter:brightness(2)}100%{left:0}}`
	
	var styleSheet = d.createElement("style")
	styleSheet.textContent = styles
	d.head.appendChild(styleSheet)
	setTimeout(gOnLoad, 99)
}

var gOnLoad = _ => {

	var html = ''
	for(var i=0; i<7; i++) {
		html += `<div style='width:8rem;height:10rem;margin-left:1.5rem;border-radius:1rem;background:rgba(0,0,0,.4)'></div>`
	}
	gRunesDiv.innerHTML = html+`<div class=iosoutline style='font-size:16rem;height:12.5rem;rotate:-90deg;position:absolute;top:-1rem;right:-9rem'>💎</div>`

	d.onmousemove = gOnMouseMove = (e) => {
		var x = e.clientX
		var y = e.clientY
		if(gMouseDown) {
			if(Math.abs(x - gMouseDownX) > 6 || Math.abs(y - gMouseDownY) > 6) {
				gMouseMoved = 1
				if(gSelTile) {
					gSelTileSet()
					//gSelTile.div.style.transition = ''
					//gDivPosSet(gSelTile, [x*gPxToRem-10,y*gPxToRem-6])
				}
			}
		}
	}
	d.onmousedown = gOnMouseDown = (e) => {
		if(e) {
			gMouseDown = 1
			gMouseMoved = 0
			gMouseDownX = e.clientX
			gMouseDownY = e.clientY
			var div = e.target
			if(div) {
				if(div.id.startsWith('tile_')) {
					var id = div.id.substr(5)
					var tile = gTiles[id]
					gSelTileSet(tile)
				}
			}
		}
	}
	d.onmouseup = gOnMouseUp = (e) => {
		gMouseDown = 0
		gSelTileSet()
		if(e) {
			var div = e.target
			if(div && !gMouseMoved) {
				if(div.tagName == 'BUTTON')
					gSoundPlay(gClickUpSound)
				if(div.closest('#gPlayFullButton')) {
					gLoadDiv.innerHTML = 'Loading...'
					gLoadDiv.className = 'glow'
					
					//gFetchFromThirdweb()
					fetch("https://curtastic.com/spellspells/thirdweb.php")
					.then(r => r.text())
					.then(gWordsFromThirdweb)
					.catch(e => {
						gLoadDiv.innerHTML = 'Failed to load.'
					})
				}
				if(div.closest('#gPlayHonorsButton')) {
					gWords9 = u
					gStateSet(gStateChest)
				}
				if(div == gCastButton) {
					if(gCastButton.className == 'no') {
						var text = gSpellTextGet()
						if(gWords9 && !gIsWord(text)) {
							gCastNoDiv.innerHTML = text ? text+' is not a word!': 'Make a word first.'
							gSoundPlay(gNoSound)
							while(1) {
								tile = gSpellTiles[0]
								if(!tile)break
								gSpellTileToHand(tile)
							}
						}
					} else {
						gCast()
					}
				}
				if(div == gRetryButton) {
					gGameReset(1)
					gMusicStop()
				}
				if(gMonDeadDiv.contains(div)) {
					gDivPosSet(gMonDeadGoldDiv, [72,1])
					gDivFontSizeSet(gMonDeadGoldDiv, 6)
					gSoundPlay('c/gl-')
					setTimeout(_ => {
						gMusicStop()
						gDivHide(gMonDeadDiv)
						gStateSet(gStateTown)
						gMonDiv.style.rotate = '0deg'
						gMonDiv.style.filter = ''
						gMonDiv.style.className = ''
						gMonDiv.parentNode.style.transform = 'translateX(25rem)'
						gGoldAdd(gMonDeadGoldDiv.innerHTML.substr(2)*1)
						gDivFontSizeSet(gMonDeadGoldDiv, 11)
						gRuneUse()
						gDayAdd(1)
						gYouDiv.style.top = '115rem'
						gYouDiv.children[0].className = ''
					}, 400)
				}
				if(gMuteButton.contains(div)) {
					gSoundPlay(gClickDownSound)
					gMuted = !gMuted
					gMusicStop()
					gMuteButton.innerHTML = gMuted ? `<div style=opacity:.5>🔈</div>`:'🔊'
					gSoundPlay(gClickUpSound)
				}
				if(div == gTurnSkipButton) {
					if(!gState2) {
						gSpellLast=''
						gTurnSkip()
						gDivHide(gTurnSkipButton)
					}
				}
				if(div == gTownLeaveButton) {
					gStateSet(gStateBattle)
				}
				if(div == gTownTileDeleteButton) {
					if(gGold < gTileDeleteCost) {
						gSoundPlay(gNoSound)
					} else {
						gGoldAdd(-gTileDeleteCost)
						gState2 = 'tileDelete'
						gTownWorkerSpeechSet("Which letter?")
						gTownOverlay.style.bottom = '51rem'
						gTileDeleteCostAdd()
					}
				}
				if(div == gTownHealButton) {
					if(gGold < gHealCost) {
						gSoundPlay(gNoSound)
						gTownWorkerSpeechSet("Go home kid!")
					} else {
						gGoldAdd(-gHealCost)
						gYouHpAdd(100-gYouHp)
						gSoundPlay(gBuySound)
						gHealCostAdd()
					}
				}
				if(div == gTownTileUpgradeButton) {
					if(gGold < gTileUpgradeCost) {
						gSoundPlay(gNoSound)
						gTownWorkerSpeechSet("Work for free because you're going to<br>save use from the dragon? Yeah right!")
					} else {
						gGoldAdd(-gTileUpgradeCost)
						gState2 = 'tileUpgrade'
						gTownWorkerSpeechSet("Which letter?")
						gTownOverlay.style.bottom = '51rem'
						gTileUpgradeCostAdd()
					}
				}
				if(div == gTownRuneBuyButton) {
					var tile = gSelRune
					if(gGold < tile.cost) {
						gSoundPlay(gNoSound)
					} else {
						if(gRuneWandGo(tile)) {
							gArrayRemove(gTownRunes, tile)
							gGoldAdd(-tile.cost)
							gSoundPlay(gBuySound)
							gTownMageSpeechSet()
						}
					}
				}
				if(div == gRuneSellButton) {
					var tile = gSelRune
					delete gWandRunes[tile.wandI]
					gSelRuneSet()
					var gold = gState == gStateTown ? 1:0
					gGoldAdd(gold)
					gTownRunes.push(tile)
					tile.cost = 2
					gTileRender(tile)
					tile.townI = -1
					gTilePosSet(tile)
				}
				if(gChestDiv.contains(div)) {
					gChestOpen()
				}
				if(div.id.startsWith('tile_')) {
					var id = div.id.substr(5)
					var tile = gTiles[id]
					gTileClicked(tile)
				}
			}
		}
	}
	
	d.addEventListener("touchstart", (e) => {
		gOnMouseDown(e.changedTouches[0])
		e.preventDefault()
		return false
	}, {passive:false})
	
	d.addEventListener("touchend", (e) => {
		gOnMouseUp(e.changedTouches[0])
		e.preventDefault()
		return false
	}, {passive:false})

	d.addEventListener("touchmove", (e) =>
	{
		gOnMouseMove(e.changedTouches[0])
		e.preventDefault()
		return false
	}, {passive:false})
	
	w.onresize = gResize

	gGameReset()
	
	if(0) {
		var html = `<h1 style='font-size:4rem'>&nbsp;Wand Enchantments</h1>`
		for(var rune of gRunes) {
			html += `
				<div style='font-size:3.4rem'>
					<div style='display:inline-block;width:5rem'>${rune.emoji}</div>${rune.name}: ${rune.text}.
				</div>
			`
		}
		d.body.innerHTML = html
		return
	}
	if(0) {
		for(var i=0;i<21;i++) {
			var letter = i==0?'!':String.fromCharCode(gRandomInt(65,90))
			var points = gLetterPointsGet(letter)
			var tile = {letter, points}
			gTileMake(tile,45,66)
			gTileBagGo(tile)
		}
		gStateSet(gStateTown)
	}

}


var gArrayRemove = (a, item) => {
	var i = a.indexOf(item)
	if(i<0)debugger
	a.splice(i,1)
}

var gDivHide = div => div.style.display='none'
var gDivShow = (div,inline,html) => {
	div.style.display = inline?'inline-block':'block'
	if(html !== u) {
		div.innerHTML = html
	}
}

var gShuffleArray = (a) => {
	for(var i=a.length-1; i>0; i--) {
		var j = Math.random() * (i + 1) | 0
		var t = a[i]
		a[i] = a[j]
		a[j] = t
	}
}

var gDivPosGet = (div,addX,addY) => {
	var rect = div.getBoundingClientRect()
	return [(rect.x-gGameX)*gPxToRem+(addX||0), rect.y*gPxToRem+(addY||0)]
}

var gDivFontSizeSet = (div,rem) => {
	div.style.fontSize = rem+'rem'
}

var gDivZSet = (div,z) => {
	(div.div || div).style.zIndex = z
}

var gDivPosSet = (div,x,y) => {
	if(x[1]) {
		y = x[1]
		x = x[0]
	}
	div = div.div || div
	div.style.left = x+'rem'
	div.style.top = y+'rem'
}

var gRandomInt = function(lo, hi) {
	return Math.floor(Math.random()*(hi+1-lo))+lo
}

var gRandomItem = function(a) {
	return a[gRandomInt(0, a.length-1)]
}

var gLetterPointsGet = letter => {
	var letterI = letter.charCodeAt(0)-65
	return gLetterPoints[letterI]||0
}

var gStateSet = state => {
	//gLog("gStateSet()",gState,state)
	gState2 = ''

	if(gState == gStateBattle) {
		gDivHide(gBattleDiv)
		gDivHide(gHandDiv)
		gTurn=0
		gSpellLast=''
		gWandRunes.forEach(runeTile => {
			runeTile.used = runeTile.use = 0
			runeTile.div.style.filter = ''
		})
	}
	
	if(gState == gStateTown) {
		gTownMageSpeechSet()
		for(var list of [gTownElfTiles, gTownRunes]) {
			while(list.length) {
				var tile = list.pop()
				tile.div.remove()
				if(list == gTownRunes) {
					gRunes.push(tile.rune)
				}
			}
		}
	}
	
	gState = state
	
	if(gState == gStateBattle) {
		var bass = 'K K M M         '
		gSoundPlay(`110
G G F F GHIHG-  G G F F 
${bass+bass}      `)
		gYouDiv.style.top = '95rem'
		gDivPosSet(gMonDeadGoldDiv, [100,40])
		gMonDiv.className=''
		gMonDiv.children[0].innerHTML = gMonPics[gDay-1]
		gDivFontSizeSet(gMonDiv, 20+gDay)
		gMonDamageSet()
		gMonHp = 0
		gMonHpAdd(8 * 1.4805**gDay | 0)
		//12,18,27,40,60,90,135,200,300,450,675,1012,1313
		if(gWandHas("🩹")) {
			gRuneUse()
			gYouHpAdd(10)
		}
		gBagDiv.style.height = 0
		gBagTiles.map(gTilePosSet)
		setTimeout(_ => {
			gBagTiles.map(tile=>gDivZSet(tile, -1))
			gMonDiv.parentNode.style.transform='translateX(0px)'
			var monGo = left => {
				gDivPosSet(gMonShotDiv, gDivPosGet(gMonDiv,left?-25:0,9))
				gDivPosSet(gMonDamageDiv, gDivPosGet(gMonDiv,left?-25:6,16))
			}
			monGo(1)
			setTimeout(monGo, 333)
		}, 222)
		gDivHide(gTownDiv)
		gDivShow(gBattleDiv)
		gTrashEmpty()
		setTimeout(_ => {
			gDivShow(gHandDiv)
			gDivHide(gBagDiv)
			gHandDraw()
		}, 666)
	}
	
	if(gState == gStateTown) {
		gDivShow(gTownDiv)
		gDivShow(gBagDiv)

		var tiles = [...gBagTiles]
		gBagTiles = []
		tiles.map(gTileBagGo)

		setTimeout(_ => {
			for(var y=0;y<2;y++) {
				for(var i=0;i<3;i++) {
					var cost = gDay/2+y+i*2+1|0
					var letter = String.fromCharCode(gRandomInt(65,90))
					if(!gRandomInt(0,22))letter = '!'
					var points = gLetterPointsGet(letter)
					var upgrades = (points/2+gDay/2)*(i+1)|0
					var kind = gTileKindTile
					var rune = u
					if(y==1) {
						kind = gTileKindRune
						rune = gRandomItem(gRunes)
						gArrayRemove(gRunes,rune)
						letter = rune.emoji
						points = 0
						upgrades = 0
					}
					var tile = gTileMake({kind, letter, points:points+upgrades, cost, rune})
					gDivZSet(tile, 1)
					tile.townI = i
					;(y ? gTownRunes : gTownElfTiles).push(tile)
					gTilePosSet(tile)
				}
			}
			gTownMageSpeechSet()
			gTownElfSpeechSet("Letters for sale!")
		},40)
	}
	
	if(gState == gStateChest) {
		gDivHide(gLoadDiv)
		
		//var clubs = gDevice == 'android' ? '': `<div style="position:absolute;bottom:3.7rem;font-size:4rem;letter-spacing:1rem;text-shadow:none;left:1rem;right:0">♣♣♣♣♣♣♣♣♣♣♣</div>`
		//gClubsDiv.innerHTML = clubs
		
		gSpeechDiv.children[0].innerHTML = "A dragon is coming in 13 days!<br>You must learn to spell spells<br>to defend our hometown.<br>Take this book my child."
		gDivShow(gIntroDiv)
		gDivShow(gBookOpenDiv)
		gDivShow(gBagDiv)
	}
}

var gSpeakText = (text, pitch, speed) => {
	var speech = !gMuted && w.SpeechSynthesisUtterance
	if(speech) {
		var bangs = text.split('!').length-1
		var msg = new speech()
		msg.text = text.toLowerCase()
		msg.pitch = (pitch||1)*(1+bangs/5)
		msg.rate = (speed||1.2)
		msg.volume = .5+bangs*.2
		w.speechSynthesis.speak(msg)
	}
}

var gTileTrashGo = (tile) => {
	if(tile.fake) {
		tile.div.remove()
		return
	}
	if(tile.turnMult > 1) {
		tile.turnMult = 1
		gTileRender(tile)
	}
	if(tile.letter == '!') {
		gTileRender(tile)
	}
	setTimeout(_ => {
		if(!tile.up)gDivZSet(tile, -1)
		gTrashRender()
	}, 222)
	tile.trashX = gRandomInt(-9,9)/9
	gDivPosSet(tile, gDivPosGet(gTrashDiv,3.5+tile.trashX,9-gTrashTiles.length+Math.random()))
	gTrashTiles.push(tile)
}

var gTrashEmpty = _ => {
	while(gTrashTiles[0]) {
		var tile = gTrashTiles.pop()
		tile.div.style.filter = ''
		gDivZSet(tile, -1)
		gTileBagGo(tile)
	}
	gShuffleArray(gBagTiles)
	var i = 0
	for(var tile of gBagTiles) {
		tile.bagI = i++
		gTilePosSet(tile)
	}
	gTrashRender()
}

var gTrashRender = _ => {
	var html = ''
	for(var i=gTrashTiles.length; i--;) {
		var tile = gTrashTiles[i]
		html += `<div style='position:relative;left:${tile.trashX}rem;margin:auto;width:10rem;height:1rem;background:linear-gradient(90deg,#FED 0%,#fc4 20%,#FC4 80%,#FED 100%);border:1px solid #000;border-top-color:#FED'></div>`
	}
	gTrashTilesDiv.innerHTML = html
}

var gHandDraw = (recur) => {
	// shift keepers because you maybe drew to a different total tiles this turn.
	if(!recur) {
		for(var tile of gHandTiles) {
			gTilePosSet(tile)
		}
	}
	if(!recur && gWandHas("🗄")) {
		for(var tile of gHandTiles) {
			if(tile.keep || tile.keepNow) {
				tile.turnMult++
				gRuneUse()
				gTilePosSet(tile)
				gTileRender(tile)
			}
		}
	}

	
	gTileDraw()
	if(gHandTiles.length<gHandSizeGet()) {
		setTimeout(_=>gHandDraw(1), 99)
		return
	}
	
	gWandRunes.map(runeTile => runeTile.use = 0)
	
	if(gWandHas("🖍")) {
		var tile = gRandomItem(gHandTiles)//don't do 0s
		tile.turnMult = 2
		gRuneUse()
		gTileRender(tile)
	}
	if(gWandHas("♻")) {
		gRuneUse()
		gState2 = 'discard'
		gDivShow(gHandDiv.children[0], 1, "Discard a letter")
		gTrashDiv.className = 'glow'
	}
	gWandRender()
	gDivShow(gTurnSkipButton)
}

var gTileDraw = _ => {
	if(!gBagTiles[0]) {
		gTrashEmpty()
	}
	var tile = gBagTiles.shift()
	//gLog("gTileDraw()", tile.letter)
	gTileHandAdd(tile)
	gSoundPlay(gDrawSound)
	

	var html = ''
	for(var tile of gBagTiles) {
		html += "<div style='margin:auto;width:10rem;height:1rem;background:linear-gradient(90deg,#FED 0%,#fc4 20%,#FC4 80%,#FED 100%);border:1px solid #000;border-top-color:#FED'></div>"
	}
	gDeckTilesDiv.innerHTML = html
}

var gHandTileGetByI = (i) => {
	for(var tile of gHandTiles) {
		if(tile.handI == i)return tile
	}	
	for(var tile of gSpellTiles) {
		if(tile.handI == i)return tile
	}	
}

var gTileHandAdd = (tile) => {
	//gLog("gTileHandAdd()", tile.letter)
	tile.div.style.cursor = 'pointer'
	if(!gSpellTiles.includes(tile)) {
		tile.handI = gHandTiles.length
		var i=0
		while(1) {
			if(!gHandTileGetByI(i)) {
				tile.handI = i
				break
			}
			i++
		}
	}
	gDivZSet(tile, tile.handI+1)
	gHandTiles.push(tile)
	gTilePosSet(tile)
	tile.keepNow = 0
}

var gHandSizeGet = _ => {
	var size = 8+gWandHas('💬')
	if(!gTurn) {
		size += gWandHas('🧰')
		gRuneUse()
	}
	return size
}

var gLetterGet = (vowelIs) => {
	while(1) {
		var letterI = gRandomInt(0,25)
		var letter = String.fromCharCode(letterI+65)
		if(gVowelIs(letter) == vowelIs) {
			if(gRandomInt(1, gLetterPoints[letterI])==1) {
				return letter
			}
		}
	}
}

var gVowelIs = (letter) => {
	return 'AEIOU'.indexOf(letter)>=0
}

var gTilePointsGet = (tile) => {
	var points = tile.points
	if(tile.letter == '!') {
		points = 0
		for(var tile2 of gSpellTiles) {
			if(tile2.letter != '!') {
				points += gTilePointsGet(tile2)
			}
		}
		tile.points = points
	} else {
		if(!points) {
			if(gTileIsBloodType(tile)) {
				points = tile.heal
			}
		}
	}
	return points * tile.turnMult * tile.spellMult
}

var gTileIsBloodType = (tile) => 
	tile.letter == 'A' && gWandHas('🅰') ||
	tile.letter == 'B' && gWandHas('🅱') ||
	tile.letter == 'O' && gWandHas('🅾')

var gTileHealGet = (tile) => {
	var heal = tile.heal
	if(!heal) {
		if(gTileIsBloodType(tile)) {
			heal = tile.points
		}
	}
	return heal * tile.turnMult * tile.spellMult
}

var gUpgradesColorGet = (tile, heal) => {
	if(heal) {
		var upgrades = gTileHealGet(tile) - tile.heal
		return upgrades>0?'#9F5':'#111'
	}
	var upgrades = gTilePointsGet(tile) - gLetterPointsGet(tile.letter)
	return upgrades > 0 ? (tile.turnMult>1 || tile.spellMult>1 ? '#DF5':'#6A8') : (upgrades<0?'#999':'#111')
}

var gTilesRender = _ => {
	for(var tile of gBagTiles) {
		gTileRender(tile)
	}
}

var gTileRender = (tile) => {
	var keep = tile.keep ? `<div style='position:absolute;left:0;top:0;font-size:4rem;line-height:7rem;opacity:.6;color:`+gUpgradesColorGet(tile)+`'>📎</div>` : ''
	var leech = tile.leech ? `<div style='position:absolute;left:4rem;bottom:0;font-size:3rem;line-height:4rem;opacity:.6;color:`+gUpgradesColorGet(tile)+`'>🩸</div>` : ''
	var heal = gTileHealGet(tile)
	var healHtml = heal ? `<div style='font-family:segoe ui emoji;position:absolute;left:0;bottom:.1rem;font-size:4rem;line-height:4rem'>❤<div style="font-size:66%;position:absolute;top:0;width:100%;text-shadow:none;color:`+gUpgradesColorGet(tile,1)+`">${heal}</div></div>` : ''

	var damage = tile.letter=='!' && !gSpellTiles.includes(tile) ? 'x' : gTilePointsGet(tile)
	if(heal && !gTilePointsGet(tile)) {
		damage = ''
	}
	
	var body = `<div style='font-family:arial;pointer-events:none;color:#111;border-radius:1rem;width:12rem;height:12rem;background:linear-gradient(0,#FC4 80%,#FED 100%);line-height:12rem;font-size:`+(tile.letter=='!'?10:7)+`rem;box-shadow:0 1px 1px #EC9, 0 1rem 0 #D80, 0 0 1px #000;position:relative;text-shadow:0 1px 0 #EDC'>
		${tile.letter}
		<div style='position:absolute;right:1rem;bottom:0;font-size:4rem;line-height:5rem;color:`+gUpgradesColorGet(tile)+`'>${damage}</div>
		${keep}
		${leech}
		${healHtml}
	</div>`
	if(tile.kind == gTileKindRune) {
		body = `<div style='pointer-events:none;font-size:10rem;width:12rem'>${tile.letter}</div>`
	}
	tile.div.innerHTML = body+(tile.cost?`<div style='position:absolute;top:13rem;width:100%;font-size:5rem'>💰`+tile.cost+`</div>`:'')
}

var gTilePosSet = (tile) => {
	if(gSpellTiles.includes(tile))
		gDivPosSet(tile, 4+12*gSpellTiles.indexOf(tile), 92)
	if(gHandTiles.includes(tile))
		gDivPosSet(tile, gDivPosGet(gHandDiv, 2+tile.handI*95/gHandSizeGet()))
	if(gTownRunes.includes(tile))
		gDivPosSet(tile, gDivPosGet(gTownElfDiv,26+tile.townI*15,36))
	if(gTownElfTiles.includes(tile))
		gDivPosSet(tile, gDivPosGet(gTownElfDiv,26+tile.townI*15,6))
	
	if(gBagTiles.includes(tile)) {
		var bottom = gSizeY*gPxToRem
		if(gState != gStateBattle) {
			gDivZSet(tile, 1)
			var cols = 8
			var tileSize = 12.1
			gDivPosSet(tile, [2+(tile.bagI%cols)*tileSize, bottom-41+2+(tile.bagI/cols|0)*tileSize])
		} else {
			var hi = gBagTiles.at(-1).bagI
			gDivPosSet(tile, [6,bottom*.8-(hi-tile.bagI)*1])
		}
	}
}

var gTileMake = (tile,x,y) => {
	var div = d.createElement('DIV')
	tile.div = div
	tile.spellMult = tile.turnMult = 1
	if(tile.keep===u)tile.keep = gRandomInt(0,6)<1
	//if(tile.leech===u)tile.leech = gRandomInt(0,6)<1
	if(tile.heal===u && gRandomInt(0,6)<1) {
		tile.heal = tile.points
		tile.points = 0
	}
	tile.heal = tile.heal||0
	gTileRender(tile)
	gDivZSet(div, -1)
	div.style.position = 'absolute'
	div.style.cursor = 'pointer'
	div.style.transition = 'left .3s ease-out, top .3s ease-out'
	if(x) {
		gDivPosSet(div,[x,y])
	}
	gTilesDiv.appendChild(div)

	gTiles.push(tile)
	tile.id = gTileId++
	div.id = "tile_"+tile.id
	return tile
}

var gTileUpgrade = (tile) => {
	var add = 1+gRandomInt(gLetterPointsGet(tile.letter), gLetterPointsGet(tile.letter)*2)
	if(tile.points || !tile.heal) {
		tile.points += add
	}
	if(tile.heal) {
		tile.heal += add
	}
	gTileRender(tile)
	return add
}

var gSpellTextGet = (all) => {
	return gSpellTiles.map(tile => tile.letter=='!' && !all?'':tile.letter).join('')
}

var gWandHasEmoji
var gWandHas = (emoji) => {
	var total = gWandRunes.filter(runeTile => runeTile.rune.emoji == emoji).length
	gWandHasEmoji = total ? emoji:u
	return total
}

var gRuneUse = (emoji) => {
	emoji = emoji || gWandHasEmoji
	if(emoji) {
		gWandRunes.map(runeTile => runeTile.letter==emoji && (runeTile.use=1))
	}
}

var gWandRender = _ => {
	gWandRunes.map(runeTile => runeTile.div.className = runeTile.use ? 'use glow':'')
}

var gTilesSpellMultSet = _ => {

	gSpellTiles.map(tile=>tile.spellMult = 1)
	
	for(var i=0; i<3; i++) {
		var tile = gSpellTiles[i]
		if(tile) {
			var has = gWandHas(['🥇','🥈','🥉'][i])
			if(has) {
				tile.spellMult += has
				gRuneUse()
			}
		}
	}

	for(var tile of gSpellTiles) {
		if(tile.heal) {
			if(gWandHas('🩺')) {
				gRuneUse()
			}
			if(gWandHas('💉')) {
				gRuneUse()
			}
			break
		}
	}
	
	if(gWandHas("🏁")) {
		var tile = gSpellTiles.at(-1)
		if(tile) {
			tile.spellMult++
			gRuneUse()
		}
	}
	
	if(gWandHas("🥂")) {
		for(var code=65; code<91; code++) {
			var total = 0
			var letter = String.fromCharCode(code)
			for(var tile of gSpellTiles) {
				if(tile.letter == letter) {
					total++
				}
			}
			if(total > 1) {
				for(var tile of gSpellTiles) {
					if(tile.letter == letter) {
						tile.spellMult += total-1
						gRuneUse()
					}
				}
			}
		}
	}

	gSpellTiles.map(gTileRender)

	for(var tile of gHandTiles) {
		if(tile.spellMult != 1) {
			tile.spellMult = 1
			gTileRender(tile)
		}
	}
	for(var tile of gTrashTiles) {
		if(tile.spellMult != 1) {
			tile.spellMult = 1
			gTileRender(tile)
		}
	}
}

var gSpellMultGet = _ => {
	var mult = 1
	if(gWandHas("🤐")) {
		if(gTurn && !gSpellLast) {
			mult++
			gRuneUse()
		}
	}
	if(gWandHas("⏰")) {
		if(gTurn == 2) {
			mult++
			gRuneUse()
		}
	}
	if(gWandHas("⌛")) {
		if(gTurn > 4) {
			mult++
			gRuneUse()
		}
	}
	if(gWandHas("💪")) {
		if(gYouHp > 49) {
			mult++
			gRuneUse()
		}
	}
	if(gWandHas("🤬")) {
		if(gSpellTiles.length == 4) {
			mult++
			gRuneUse()
		}
	}
	if(gWandHas("👶")) {
		if(gSpellTiles.length < 4) {
			mult++
			gRuneUse()
		}
	}
	if(gWandHas("🌕")) {
		if(gSpellTextGet().includes('OO')) {
			mult++
			gRuneUse()
		}
	}
	if(gWandHas("🧀")) {
		if(gSpellTextGet().includes('EE')) {
			mult++
			gRuneUse()
		}
	}
	if(gWandHas("🆖")) {
		if(gSpellTextGet().includes('ING')) {
			mult++
		}
	}
	if(gWandHas("🎰")) {
		if(gSpellTiles.length == 7) {
			mult+=2
			gRuneUse()
		}
	}
	if(gWandHas("🤓")) {
		if(gSpellTiles.length >= 6) {
			mult++
			gRuneUse()
		}
	}
	if(gWandHas("📓")) {
		if(!gSpellTexts[gSpellTextGet()]) {
			mult++
			gRuneUse()
		}
	}
	if(gWandHas('™')) {
		if(gSpellTextGet() == gSpellCastMostGet()) {
			mult++
			gRuneUse()
		}
	}
	if(gWandHas('🖇')) {
		var total = gSpellTiles.filter(tile => tile.keep).length
		if(total > 1) {
			mult += total-1
			gRuneUse()
		}
	}
	return mult
}

var gSelRuneSet = (tile) => {
	if(gSelRune) {
		gSelRune.div.className = ''
		gDivHide(gTownRuneBuyButton)
		gDivHide(gRuneInfoDiv)
		gDivHide(gRuneSellButton)
	}
	gSelRune = tile
	if(tile) {
		tile.div.className = 'sel'
	} else {
		gTownMageSpeechSet()
	}
}

var gSelTile
var gSelTileSet = (tile) => {
	if(gSelTile) {
		gSelTile.div.style.filter = ''
	}
	gSelTile = tile
	if(tile)tile.div.style.filter = 'brightness(1.1)'
}

var gTileCast = (tile, i, spellMult) => {
	gDivPosSet(tile, gDivPosGet(gMonDiv, 4+i*10, 9))
	setTimeout(_ => {
		if(gTileHealGet(tile)) {
			gDivPosSet(gHealHeartDiv, gDivPosGet(gYouDiv,11,22))
			setTimeout(_ => {
				gYouHpAdd(gTileHealGet(tile)*spellMult)
				gDivHide(gHealHeartDiv)
				gDivPosSet(gHealHeartDiv, gDivPosGet(gHealTotalDiv,-8))
				gYouDiv.className = 'healed'
			}, 400)
		}
		if(gMonHp) {
			gMonHpAdd(-gTilePointsGet(tile)*spellMult)
			if(gMonHp<=0) {
				if(gWandHas('🆙')) {
					gRuneUse()
					var tile2 = tile
					if(tile2.letter == '!' && gSpellTiles[0]) {
						tile2 = gSpellTiles[0]
					}
					tile2.up = gTileUpgrade(tile2)
					//alert(`Your letter ${tile2.letter} was upgraded by `+)
				}
			}
		}
		gArrayRemove(gSpellTiles, tile)
		gTileTrashGo(tile)
	}, 300-i*55)
}

var gMonHpAdd = (hp) => {
	if(hp && (hp>0 || gMonHp>0)) {
		gMonHp += hp
		if(hp<0) {
			gMonDiv.className = 'hit'
			if(gMonHp <= 0) {
				gMonHp=0
				gMonDiv.style.rotate = '90deg'
				gMonDiv.style.filter = 'grayscale(1)'
				gSoundPlay(gMonDieSound)
			}
		}
		gMonHpDiv.innerHTML = gMonHp
	}
}

var gSpellCastMostGet = _ => {
	var hi = 0
	var best = ''
	for(var text in gSpellTexts) {
		if(hi < gSpellTexts[text]) {
			hi = gSpellTexts[text]
			best = text
		}
	}
	return best
}

var gAbacusDamageGet = _ => {
	if(gWandHas("🧮")) {
		var damage = 0
		for(var tile2 of gSpellTiles) {
			damage += gTilePointsGet(tile2)
		}
		damage *= gSpellMultGet()
		return Math.ceil(damage/10)*10-damage
	}
	return 0
}

var gGameOverMusicPlay = _ => {
gSoundPlay(`240
       OT-T7X-VTV-V3Q-OOT-T5T-XYc---a-a-c-caX-XaY4VTQ-OOTTXac-aXV-7VT---        
H-J-L-H-M---O-O-H-------H-------H-J-L-H-M---L---M---Q---J-M-M-OML-H-M-L-O---H---`)
}

var gGameOverShow = (cheated) => {
	gGameOverMusicPlay()
	gSpeakText("bleh",u,.3)
	gYouDiv.children[0].style.rotate='-90deg';
	gYouDiv.children[0].style.filter = 'sepia(1) hue-rotate(-50deg)'
	gDivZSet(gGameOverDiv, 4)
	gGameOverDiv.style.opacity = 1
	if(cheated)gGameOverDiv.innerHTML = `<div style='font-size:5rem;padding:4rem'>Cheater!!!<br>${gSpellTextGet()} is not a word!</div>`
	gDivShow(gRetryButton)
	var tiles = []
	var text = "GAME OVER"
	for(var i=0; i<text.length; i++) {
		var letter = text[i]
		if(letter != ' ') {
			var tile = gTileMake({letter, points:gRandomInt(0,3), keep:0, leech:0}, -99-i*9, 55)
			tiles.push(tile)
			gDivZSet(tile, 5)
		}
	}
	setTimeout(_ => {
		var y=60,x=0,i=0
		for(var tile of tiles) {
			gDivPosSet(tile, 50-13*2+x, y)
			x+=13
			i++
			if(i==4) {
				x=0
				y+=20
			}
		}
	}, 99)
}

var gCheated = _ => {
	if(gYouHp > 0) {
		gYouHpAdd(-gRandomInt(3,6))
		
		setTimeout(gCheated, 99)
	} else {
		gSpellTiles.forEach(tile=>gDivHide(tile.div))
		gGameOverShow(1)
		gYouDiv.className=''
	}
}

var gCast = _ => {
	gYouDiv.children[0].className='cast'
	
	gSpeakText(gSpellTextGet(1))
	if(!gIsWord(gSpellTextGet())) {
		gYouDiv.className='glow'
		gYouDiv.style.animationDuration='.1s'
		gSpeakText("Oh no!",2,2)
		gCheated()
		return
	}
	gMonDiv.className=''
	gCastButton.className = 'no'
	gDivHide(gTurnSkipButton)
	var text = gSpellTextGet()
	var mult = gSpellMultGet()
	var abacusDamage = gAbacusDamageGet()
	
	var points = 0, heal = 0
	for(var tile of gSpellTiles) {
		points += gTilePointsGet(tile)
	}
	var damage = points * mult
	if(gDamageHi < damage) {
		gDamageHi = damage
		gDamageHiWord = gSpellTextGet(1)
	}
	if(gLettersHi < gSpellTiles.length) {
		gLettersHi = gSpellTiles.length
		gLettersHiWord = gSpellTextGet(1)
	}
	
	if(gWandHas('🎰') && gSpellTiles.length==7) {
		gYouHpAdd(99)
	}
	
	var mult = gSpellMultGet()
	var i=0
	for(var tile of gSpellTiles) {
		gTileCast(tile, i++, mult)
	}
	gMonHpAdd(-abacusDamage)
	gSpellTexts[text] = (gSpellTexts[text]||0)+1
	gSpellLast = text
	setTimeout(_ => {
		gTilesSpellMultSet()
		gHealTotalDiv.innerHTML = gSpellTotalDiv.innerHTML = '&nbsp;'
		if(gMonHp) {
			gTurnSkip()
		} else {
			gWandRunes.forEach(runeTile => runeTile.use = 0)
			gMonDie()
		}
		gYouDiv.children[0].className=''
	}, 999)

	gWandRender()
}

var gMonDie = _ => {
	//gLog("gMonDie()")
	if(gState2)return
	gState2 = 'monDie'
	setTimeout(_ => {
		gTrashEmpty()
		while(gHandTiles[0]) {
			var tile = gHandTiles.pop()
			if(tile.turnMult > 1) {
				tile.turnMult = 1
				gTileRender(tile)
			}
			gTileBagGo(tile)
		}
		setTimeout(_ => {
			gBagTiles.sort((a,b)=>a.id-b.id)
			var upText = ''
			gBagTiles.forEach(tile => {
				if(tile.up) {
					upText = tile.letter + " upgraded by "+tile.up+"!"
					tile.up = 0
					gDivPosSet(tile, [44,84])
					gDivZSet(tile, 1)
					gRuneUse('🆙')
					gWandRender()
				} else {
					gDivZSet(tile, -1)
					gTilePosSet(tile)
				}
				tile.bagI = tile.id
			})
			gTileUpDiv.innerHTML = upText
		}, 222)
		gWandRender()
		setTimeout(_ => {
			if(gDay>12) {
				gGameOverMusicPlay()
				gStateSet(gStateWin)
				gDivZSet(gWinDiv, 4)
				gWinDiv.style.opacity = 1
				var average = Math.round(gBagTiles.reduce((total, tile)=>total+tile.points,0) / gBagTiles.length)
				var score = gGold*20+gYouHp*2+gDamageHi+gLettersHi*100+average*100
				var lefts = `Health: 🧡${gYouHp} x2,Money: 💰${gGold} x50,Average Letter Points: ${average} x100,Longest Spell: 🔤${gLettersHi} x100 (${gLettersHiWord}),Most Damage: 🔥${gDamageHi} (${gDamageHiWord})`.split(',')
				var rights = `${gYouHp*2},${gGold*20},${average*100},${gLettersHi*100},${gDamageHi}`.split(',')
				gWinDiv.innerHTML = `
					<h3 style='margin:0 0 2rem 0'>
						The terrifying dragon was defeated by a most clever wizard. The town is saved!
					</h3>
					<div style='font-size:70%'>
						`+lefts.map((text,i) => `<div style='display:flex;width:100%;justify-content:space-between'><div>${text} =</div><div>🏆${rights[i]}</div></div>`).join('')+`
					</div>
					<h2>
						Final Score: 🏆${score}
					</h2>
					<h4 style='margin:20rem 0 0 0'>Share Your Result</h4>
					<textarea style='width:100%;height:24rem;padding:1rem;font-size:3.7rem'>My high score in Spell Spells: 🏆${score}!
Best word: ${gDamageHiWord} (🔥${gDamageHi})
My wand: ${gWandRunes.map(tile=>tile.letter).join('')}
https://curtastic.com/spellspells</textarea>`
				gDivShow(gRetryButton)
			} else {
				gStateSet(gStateMonDead)
				gMonDeadGoldDiv.innerHTML = '💰'+((6+gDay)*(gWandHas("💸")?1.33:1)|0)
				gDivShow(gMonDeadDiv)
				gSoundPlay(`220
R-RTV-TRW-VTV-V-T-VWV-TR
M-MQR-Q R-RQR-R-Q-R-R-Q 
V-VYY-YYa-Y-Y-Y-Y-YaY-YV
R-RMR-MRK-RMR-R-M-RKR-MO
`)
				setTimeout(_ => {
					gDivPosSet(gMonDeadGoldDiv, [41,50])
				}, 44)
				
				gYouDiv.children[0].className = 'dance'
			}
		}, 1333)
		gSpeakText('ha ha ha', u, 1.5)
		gMusicStop()
	}, 44)
}

var gTurnSkip = _ => {
	gCastNoDiv.innerHTML = ''
	
	gSpellTiles.map(gTileHandAdd)
	gSpellTiles.map(gTilePosSet)
	gSpellTiles = []
	
	if(gWandHas('🧷') && gState2 != 'keep') {
		var list = gHandTiles.filter(tile => !tile.keep)
		var total = list.length
		if(total > 1) {
			gRuneUse()
			gState2 = 'keep'
			gDivShow(gHandDiv.children[0], 1, "Choose a letter to keep:")
			return
		}
		if(total == 1) {
			list[0].keepNow = 1
		}
	}
	
	for(var tile of gHandTiles) {
		if(!tile.keep && !tile.keepNow) {
			gTileTrashGo(tile)
		} else {
			if(tile.turnMult > 1) {
				tile.turnMult = 1
				gTileRender(tile)
			}
		}
	}
	gHandTiles = gHandTiles.filter(tile=>tile.keep || tile.keepNow)
	gHandTiles.map(tile => tile.keepNow=0)
	
	gMonShotDiv.className = 'spin'
	gDivPosSet(gMonShotDiv, gDivPosGet(gYouDiv,3,11))
	setTimeout(_ => {
		gDivHide(gMonShotDiv)
		gDivPosSet(gMonShotDiv, gDivPosGet(gMonDiv,0,9))
		gYouDiv.className='hit'
		gYouHpAdd(-gMonDamage)
		/*
		if(gYouHp < 1) {
			gWandRunes.forEach(runeTile => {
				if(runeTile.letter == '🆘' && !runeTile.used) {
					gYouHpAdd(30)
					runeTile.used = 1
					runeTile.div.style.filter = 'brightness(.5)'
				}
			})
		}
		*/
		if(gYouHp < 1) {
			gGameOverShow()
		} else {
			gSpeakText("ow")
		}
		gTurn++
	}, 444)
	setTimeout(_ => {
		if(gYouHp > 0) {
			setTimeout(_ => {
				gYouDiv.className = gMonShotDiv.className = ''
				gDivShow(gMonShotDiv)
				gMonDamageSet()
				gHandDraw()
			}, 44)
		}
	}, 999)
}

var gMonDamageSet = _ => {
	gMonDamage = (8+gDay)*(1+(gTurn-1)/8) | 0
	gMonDamageDiv.innerHTML = gMonDamage
}

var gChestOpen = _ => {
	if(gBookOpenDiv.style.display == 'none') {
		if(gBookOpenDiv2.style.display != 'none') {
			gChestOpen2()
		}
		return
	}
	gSoundPlay(gClickDownSound)
	
	var vowels = gRandomInt(6,7)
	var letters = []
	for(var i=0; i<vowels; i++) {
		letters.push(gLetterGet(1))
	}
	while(letters.length < 20) {
		letters.push(gLetterGet(0))
	}
	
	var tiles = []
	for(var letter of letters) {
		tiles.push({letter, points:gLetterPointsGet(letter)})
	}

	gShuffleArray(tiles)
	
	var i=0
	while(1) {
		var tile = tiles[i*4]
		if(!tile)break
		i++
		if(i<3) {
			tile.points++
			if(tile.points>6)tile.points++
		} else {
			if(tile.points>0) {
				tile.points--
				if(tile.points>6)tile.points--
			}
		}
	}
	
	tiles.push({letter:'!', points:0})
	
	for(var tile of tiles) {
		gTileMake(tile,45,66)
		gChestTiles.push(tile)
	}

	var html = ''
	var row = ''
	var i=0
	for(var tile of gChestTiles) {
		var color = tile.heal ? '#D55': gUpgradesColorGet(tile)
		row += `<span id=gBookTile${tile.id} style='`+(i%4==0?'font-size:120%;':'')+`color:${color}'>${tile.letter}</span>`
		if(i==3 || i==7 || i==11 || i==15 || i==20) {
			html += `<div>${row}</div>`
			row = ''
		}
		i++
	}
	gBookPageDiv.innerHTML = html
	
	gBookCoverDiv.style.transform = 'rotateY(-155deg)'
	gDivHide(gBookOpenDiv)
	gDivShow(gBookOpenDiv2)
	gDivHide(gSpeechDiv)
	
	setTimeout(_ => {
		for(var tile of gChestTiles) {
			var div = d.getElementById("gBookTile"+tile.id)
			if(div) {
				gDivPosSet(tile, gDivPosGet(div))
			}
		}
	},40)
}

var gRuneWandGo = (tile) => {
	for(var i=0; i<gWandRunes.length; i++) {
		if(!gWandRunes[i]) {
			gWandRunes[i] = tile
			tile.wandI = i
			
			gDivPosSet(tile, gDivPosGet(gRunesDiv, 4+tile.wandI*11.2, .5))
			gDivHide(tile.div.lastChild)
			gDivFontSizeSet(tile.div.firstChild, 8)
			gSelRuneSet()
			gTilesRender()//in case bought blood type
			return 1
		}
	}
	
}

var gTileBagGo = (tile) => {
	tile.div.style.cursor = ''
	tile.bagI = gBagTiles.length
	gBagTiles.push(tile)
	
	gBagDiv.style.height = '41rem'
	
	gTilePosSet(tile)
	//gBagDiv.innerHTML = ''
	gBagTotalDiv.innerHTML = `🎒 Your Bag (${gBagTiles.length})`
}

var gChestTileBagGo = (tile) => {
	setTimeout(_ => {
		d.getElementById("gBookTile"+tile.id).style.color = '#999'
		gTileBagGo(tile)
		gSoundPlay(gDrawSound)
	}, gChestTiles.indexOf(tile)*99)
}

var gSpellTileToHand = (tile) => {
	if(tile.letter == "Q") {
		var tile2 = gSpellTiles[gSpellTiles.indexOf(tile)+1]
		if(tile2 && tile2.fake) {
			gArrayRemove(gSpellTiles, tile2)
			tile2.div.remove()
		}
	}
	gArrayRemove(gSpellTiles, tile)

	if(tile.fake) {
		tile.div.remove()
	} else {
		gTileHandAdd(tile)
	}
	
	if(tile.letter == '!') {
		gTileRender(tile)
	}
}

var gChestOpen2 = _ => {
	gBagTextDiv.innerHTML = ''

	gChestTiles.map(gChestTileBagGo)
	
	setTimeout(_ => {
		setTimeout(_ => {
			gChestDiv.style.opacity = 0
			gChestDiv.style.top = '5rem'
		},44)
		gSpeechDiv.children[0].innerHTML = "Aaah! A mosquito!<br>Cast some spells on it!<br>Make real words only!<br>Tap the letters."
		gDivShow(gSpeechDiv)
		//gSpeechDiv.innerHTML = "The dragon is coming on the<br>13th night to destroy us!<br>Practice your spells against<br>monsters of the night until then."
		gStateSet(gStateBattle)
		gYouDiv.style.top = '95rem'
	}, gChestTiles.length*99+333)
	gChestTiles = []
	
	gBookOpenDiv2.style.display = 'none'

}

var gResize = _=>{
	gSizeX = innerWidth
	gSizeY = innerHeight

	//gLog("gResize", gSizeX, gSizeY)
	if(gSizeX/gSizeY > .57) {
		//gLog("wide screen")
		gSizeX = gSizeY*.57
		gGameX = (innerWidth-gSizeX)>>1
	} else {
		//gLog("tall screen")
		gGameX = 0
	}
	gGameDiv.style.right = gGameDiv.style.left = gGameX+'px'
	gPxToRem = 100/gSizeX
	d.documentElement.style.fontSize = 1/gPxToRem+'px'

	for(var tile of gTiles) {
		gTilePosSet(tile)
	}
}

var gGoldAdd = add => {
	gGold += add
	gGoldDiv.innerHTML = gGold
}

var gDayAdd = add => {
	gDay += add
	gDayDiv.innerHTML = gDay+'/13'
}

var gYouHpAdd = add => {
	if(add>0 && gWandHas('🩺')) {
		gRuneUse()
		add *= 2
	}

	if(add > 0) {
		add = Math.min(add, 100-gYouHp)
	}
	gYouHp += add
	if(gYouHp<0)gYouHp=0
	gYouHpDiv.innerHTML = gHpDiv.innerHTML = gYouHp//+'/100'

	if(gState == gStateBattle && add>0 && gWandHas('💉')) {
		gRuneUse()
		gMonHpAdd(-add)
		if(gMonHp <= 0) {
			gMonDie()
		}
	}
}

var gTileDeleteCostAdd = _ => {
	gTileDeleteCost++
	gTownTileDeleteButton.innerHTML = "Remove<br>Letter<br>💰"+gTileDeleteCost
}

var gTileUpgradeCostAdd = _ => {
	gTileUpgradeCost++
	gTownTileUpgradeButton.innerHTML = "Upgrade<br>Letter<br>💰"+gTileUpgradeCost
}

var gHealCostAdd = _ => {
	gHealCost++
	gTownHealButton.innerHTML = "Heal to<br>❤100<br>💰"+gHealCost
}

var gTownWorkerSpeechSet = (text) => {
	gTownWorkerDiv.children[1].children[0].innerHTML = ""+(text||'Fix your letters for you?')
}

var gTownMageSpeechSet = (text) => {
	if(!text) {
		text = gTownRunes[0]?'Wand Enchantments!': "Thank you"
	}
	gTownMageDiv.children[1].children[0].innerHTML = text
}

var gTownElfSpeechSet = (text) => {
	gTownElfDiv.children[1].children[0].innerHTML = text
}

var gTileClicked = tile => {
	//gLog("clicked", tile)
	if(tile.rune) {
		if(tile == gSelRune) {
			gSelRuneSet()
			gSoundPlay(gCancelSound)
		} else {
			gSoundPlay(gClickUpSound)
			gSelRuneSet(tile)
			var speechDiv = gTownMageDiv.children[1]
			if(gWandRunes.includes(tile)) {
				speechDiv = gRuneInfoDiv
				gDivPosSet(speechDiv, gDivPosGet(tile.div,8,-12))
				gDivShow(speechDiv)
				speechDiv.style.maxWidth = 98-gDivPosGet(speechDiv)[0]+'rem'

				var gold = gState == gStateTown ? 1:0
				gRuneSellButton.innerHTML = gold ? "Sell<br>💰1" : "🗑 Toss"
				gDivFontSizeSet(gRuneSellButton, gold ? 3.5 : 2.5)
				gDivShow(gRuneSellButton)
				gDivPosSet(gRuneSellButton, gDivPosGet(tile.div,0,12))
			} else {
				gTownRuneBuyButton.innerHTML = "Buy<br>💰"+tile.cost
				gDivShow(gTownRuneBuyButton)
			}
			speechDiv.children[0].innerHTML = tile.rune.emoji+' '+tile.rune.name+'<br>'+tile.rune.text+(tile.rune.emoji == '™' ? ': '+gSpellCastMostGet():'')+'.'
		}
		return
	}
	if(gTownElfTiles.includes(tile)) {
		if(gGold < tile.cost) {
			gTownElfSpeechSet("Not enough money.")
			gSoundPlay(gNoSound)
		} else {
			gSoundPlay(gBuySound)
			gGoldAdd(-tile.cost)
			gArrayRemove(gTownElfTiles, tile)
			gDivHide(tile.div.lastChild)
			tile.cost = 0
			gTileRender(tile)//in case you have that blood type
			gTileBagGo(tile)
			gTownElfSpeechSet("Thank you!")
		}
	}
	if(gState == gStateBattle) {
		gDivHide(gIntroDiv)
		gWandRunes.forEach(runeTile => runeTile.use = 0)
		if(gSpellTiles.includes(tile)) {
			gSpellTileToHand(tile)

			if(tile.letter != '!' && !gIsWord(gSpellTextGet())) {
				for(var tile2 of gSpellTiles) {
					if(tile2.letter == '!') {
						gSpellTileToHand(tile2)
					}
				}
			}
			
			gTilesSpellMultSet()
			gSpellTiles.map(gTilePosSet)
			
			//var pitch = 26+gSpellTiles.length*5
			//gSoundPlay(gSoundEffectMake([pitch, pitch-1, .06]))
			gSoundPlay(gTileCancelSounds[gSpellTiles.length])
			
		} else if(gHandTiles.includes(tile)) {
			if(gState2 == 'keep') {
				if(tile.keep)return
				tile.keepNow = 1
				gTurnSkip()
				gState2 = ''
				gDivHide(gHandDiv.children[0])
			} else {
				if(gState2 == 'discard') {
					gArrayRemove(gHandTiles, tile)
					gTileTrashGo(tile)
					gTileDraw()
					gState2 = ''
					gDivHide(gHandDiv.children[0])
					gWandRender()
					gTrashDiv.className = ''
				} else {
					if(tile.letter != '!' && gSpellTiles[0] && gSpellTiles.at(-1).letter == '!') {
						gDivShow(gHandDiv.children[0], 1, "Can't put letters after !")
						return
					}
					if(tile.letter == '!' && gCastButton.className == 'no') {
						gDivShow(gHandDiv.children[0], 1, "Can only use at the end of a word.")
						return
					} else {
						gDivHide(gHandDiv.children[0])
						//var pitch = 26+gSpellTiles.length*5
						//gSoundPlay(gSoundEffectMake([pitch, pitch, .1]))
						gSoundPlay(gTileUseSounds[gSpellTiles.length])
						gArrayRemove(gHandTiles, tile)
						gSpellTiles.push(tile)
	
						if(tile.letter == 'Q' && gWandHas('👸')) {
							var tile2 = gTileMake({letter:'U', points:2, fake: 1, heal:0, keep:0})
							gDivZSet(tile2, 1)
							gSpellTiles.push(tile2)
							gTilePosSet(tile2)
						}
						
						gTilesSpellMultSet()
						gTilePosSet(tile)
					}
				}
			}
		}
		var points = 0, heal = 0
		for(var tile2 of gSpellTiles) {
			points += gTilePointsGet(tile2)
			heal += gTileHealGet(tile2)
		}
		var mult = gSpellMultGet()
		gSpellTotalDiv.innerHTML = '🔥'+ (
			mult>1 ?
				points+`<span style='font-size:60%;color:#3F3'>x${mult}</span>=<span style='color:#3F3'>`+(points*mult+gAbacusDamageGet())+`</span>`
			:
				(points+gAbacusDamageGet())
		) + (gAbacusDamageGet() ? '🧮':'')

		if(gAbacusDamageGet()) {
			gRuneUse('🧮')
		}
		var enabled = gSpellTiles[0]
		if(gWords9) {
			enabled = gIsWord(gSpellTextGet())
		}
		gCastButton.className = enabled ? '':'no'

		if(heal) {
			gDivShow(gHealHeartDiv)
		} else {
			gDivHide(gHealHeartDiv)
		}
		if(gWandHas('🩺')) {
			if(heal) {
				gRuneUse()
				mult++
			} else {
				gWandRunes.forEach(runeTile => runeTile.letter==gWandHasEmoji && (runeTile.use=0))
			}
		}
		gHealTotalDiv.innerHTML = heal ? heal+(
			mult>1 ?
			`<span style='font-size:60%;color:#3F3'>x${mult}</span>=<span style='color:#3F3'>`+(heal*mult)+`</span>`
			: ''
		) : ''

		gWandRender()
		
		gCastNoDiv.innerHTML = ''
	}
	if(gState2 == 'tileDelete') {
		//gLog('delete')
		gSoundPlay(gDeleteSound)
		gArrayRemove(gBagTiles, tile)
		tile.div.remove()
		gState2 = ''
		gTownWorkerSpeechSet()
		gTownOverlay.style.bottom = '100%'
	}
	if(gState2 == 'tileUpgrade') {
		if(tile.letter == '!') {
			gSoundPlay(gNoSound)
		} else {
			//gLog('upgrade')
			gSoundPlay(gUpgradeSound)
			gState2 = ''
			gTownWorkerSpeechSet()
			gTownOverlay.style.bottom = '100%'
			gTileUpgrade(tile)
		}
	}
}

var gGameReset = (again) => {
	gTilesDiv.innerHTML = ''
	gTiles = []
	gBagTiles = []
	gHandTiles = []
	gTrashTiles = []
	gSpellTiles = []
	gWandRunes = [,,,,,,,]
	gSpellTexts = []
	gTileId = 0
	
	gRunes = []
	for(var i=0; i<gRuneInfos.length; i+=2) {
		var line = gRuneInfos[i]
		var spaceI = line.indexOf(' ')
		gRunes.push({emoji: line.substr(0,spaceI), name: line.substr(spaceI+1), text:gRuneInfos[i+1]})
	}
	
	gDamageHi = gLettersHi = 0
	gDamageHiWord = gLettersHiWord = ''
	gGold = gDay = 0
	gGoldAdd(6)
	gDayAdd(1)
	gYouHp = 1
	gYouHpAdd(99)
	gHealCost = 9
	gHealCostAdd()
	gTileUpgradeCost = gTileDeleteCost = 4
	gTileUpgradeCostAdd()
	gTileDeleteCostAdd()
	gTownWorkerSpeechSet()

	gDivHide(gRetryButton)
	gDivZSet(gGameOverDiv, -1)
	gDivZSet(gWinDiv, -1)
	gGameOverDiv.style.opacity = gWinDiv.style.opacity = 0
	gChestDiv.style.opacity = 1
	gChestDiv.style.top = 0
	gBookCoverDiv.style.transform = ''
	gYouDiv.children[0].style.rotate = '0deg';
	gYouDiv.children[0].style.filter = ''
	
	gResize()
	gStateSet(again?gStateChest:gStateLoading)
}



/*
// This is a generic function for playing JS audioBuffers.
var gSoundPlay = function(audioBuffer, x) {
	if(gMuted)return
	var source = gSoundEffectContext.createBufferSource()
	if(!source) {
		return
	}

	var gVolume = .7
	var volume = 1
	
	source.buffer = audioBuffer
	
	var gainNode = gSoundEffectContext.createGain()

	if(x !== u) {
		var gainNode2 = gSoundEffectContext.createGain()

		var pan01 = gClamp(x/1e3,0,1)
		
		gainNode.gain.value = volume * gVolume * (1 - pan01)
		gainNode2.gain.value = volume * gVolume * pan01

		
		var splitter = gSoundEffectContext.createChannelSplitter(2)
		source.connect(splitter, 0, 0)
		var merger = gSoundEffectContext.createChannelMerger(2)
		
		splitter.connect(gainNode, 0)
		splitter.connect(gainNode2, 0)
		
		gainNode.connect(merger,0,0)
		gainNode2.connect(merger,0,1)
		merger.connect(gSoundEffectContext.destination)
	}
	else
	{
		gainNode.gain.value = volume * gVolume
		source.connect(gainNode)
		gainNode.connect(gSoundEffectContext.destination)
	}
	
	source.start(0)
	return source
}

var gSoundEffectContext = new (w.AudioContext || webkitAudioContext)()
var gSoundEffectMake = function(notes, fun) {
	// Calculate total duration, adding up duration of each note.
	var seconds = 0
	for(var i=0; i<notes.length; i+=3) {
		seconds += notes[i+2]
	}
	
	// Make the array buffer.
	var bytesPerSecond = gSoundEffectContext.sampleRate;
	var songLength = Math.round(bytesPerSecond * seconds)
	var audioBuffer = gSoundEffectContext.createBuffer(1, songLength, bytesPerSecond)
	
	// Make 2 buffers so that notes can overlap a bit without overwriting part of eachother.
	var bytes = audioBuffer.getChannelData(0)
	var bytes2 = new Float32Array(songLength)
	
	var songByteI = 0
	var fadeIn = 0, fadeOut = 0
	var pi2 = Math.PI*2
	
	// Each note uses 3 slots in the passed in array.
	for(var i=0; i<notes.length; i+=3) {
		// Calculate how many buffer array slots will be used for fade in / fade out of this note.
		fadeIn = bytesPerSecond * .01 | 0
		// Overlap the fades of the notes.
		//songByteI -= Math.min(fadeOut, fadeIn)
		fadeOut = bytesPerSecond * .01 | 0
		
		// Calculate sine wave multiplier for start/end frequency.
		var multiplier = pi2 * notes[i]*10 / bytesPerSecond
		var multiplier2 = pi2 * notes[i+1]*10 / bytesPerSecond
		
		var noteLen = bytesPerSecond * notes[i+2] | 0
		
		// Alternate which buffer we are writing to.
		var bytesForNote = i/5%2 ? bytes2 : bytes

		var byteI2 = 0
		for(var byteI=0; byteI<noteLen; byteI++) {
			// Smoothly transition from start frequency to end frequency of this note.
			var far = byteI/noteLen
			var angle = byteI2 * (multiplier2*far + multiplier*(1-far))
			var v = Math.sin(angle)
			byteI2++
			if(fun)byteI2 += fun(byteI,noteLen)
			// Apply fade in / fade out by adjusting the volume.
			if(byteI < fadeIn) {
				v *= byteI / fadeIn
			} else if(byteI > noteLen-fadeOut) {
				v *= (noteLen-byteI) / fadeOut
			}

			var sampleRest = noteLen*3
			var pitch = notes[i]+byteI/noteLen * (notes[i+1]-notes[i])
			var note = 65.406 * 1.06 ** pitch / bytesPerSecond
			var i2 = byteI2
			v = (i2 < 88 ?
						i2 / 88.2
						// The other samples represent the rest of the note
						: (1 - (i2 - 88.2) / sampleRest) ** ((Math.log(1e4 * note) / 2) ** 2)
					) * pianoify(i2 * note)

			bytesForNote[songByteI++] = v
		}
	}

	// Combine the 2 channels into 1. Average them together for when note's fades slightly overlap.
	for(var i=0; i<songLength; i++) {
		bytes[i] = (bytes[i]+bytes2[i])/2
	}
	
	return audioBuffer
}

var p = a => {
	var a2 = []
	for(var i=0; i<a.length; i+=2) {
		a2.push(a[i])
		a2.push(a[i])
		a2.push(a[i+1]/10)
	}
	return a2
}
	var b = (note, add) => Math.sin(note*6.28 + add)
var pianoify = (note) => b(note, b(note,0)**2 + b(note,.25)*.75 + b(note,.5)*.1)

*/

	
var gWave = (note, add) => Math.sin(note*6.28 + add)
var gPianoify = (note) => gWave(note, gWave(note,0)**2 + gWave(note,.25)*.75 + gWave(note,.5)*.1)
var gPianoBuffers = {}

var gAudioContexts = [...Array(9).keys()].map(_=>new AudioContext),
	tracks,
	trackLen,
	interval


/*
var gBufferPlay = (buffer, when) => {
	console.log("gBufferPlay()",when)
	var f = (stop) => {
		var context = gAudioContexts[0],
			source = context.createBufferSource()
		source.buffer = buffer
		source.connect(context.destination)
		source.start()
		stop && source.stop()
	}
	if(when>0) {
		setTimeout(f, when)
	} else {
		f(when===u)
	}
}
*/

var gPianoContextI = 0
var gSoundPlay = (string) => {
	var tempo = .1, noteLen = .5, trackLen
	var tracks = string.replace(/[\!\|]/g,'').split('\n').map(track => {
		if(!track) {
			return 0
		}
		if(track*1) { 
			//track = track.split('.')
			tempo = track/1e3
			//noteLen = track[1]/100 || noteLen
			return 0
		}

		gPianoContextI++
		var context = gAudioContexts[gPianoContextI%9]
		var now = context.currentTime+.1
		var node = new OscillatorNode(context)
		var gain = new GainNode(context)
		
		var real = new Float32Array(3)
		var imag = new Float32Array(3)
		real[1] = real[2] = 1
		
		const wave = context.createPeriodicWave(real, imag)
		node.setPeriodicWave(wave)
		
		node.connect(gain).connect(context.destination)
		//if(!nodes[0])node.type = "triangle"

		var volume = track.length > 18 ? .5:1
		var i=0,noteOld
		for(var forI=0; forI<track.length; forI++) {
			var letter = track[forI]
			var duration = 1,
				note = track[forI-1]!='/' && letter.charCodeAt(0)
			note -= letter>0 ? (53-noteOld) : (note>90 ? 71 : 65)
			while(track[forI+duration]=='-') {
				duration++
			}
			var note2 = note
			if(track[forI+duration] == '/') {
				note2 = track[forI+duration+1].charCodeAt(0)
				note2 -= note2>90 ? 71 : 65
			}

			var i2 = i
			if(note>=0) {
				i2 += (letter>0?.45:0)
				if(note2 != note) {
					node.frequency.setValueCurveAtTime([65.406 * 1.06 ** note,65.406 * 1.06 ** note2], now+i*tempo, .05)
				} else {
					node.frequency.setValueAtTime(65.406 * 1.06 ** note, now+i2*tempo)
				}
				gain.gain.setTargetAtTime(volume, now+.01+i2*tempo, .01)
				i += duration
				i2 += duration
				noteOld = note
			}
			if(i) {
				gain.gain.setTargetAtTime(0, now+.01+(i2-.5)*tempo, .05)
			}
			if(letter == ' ') {
				i++
			}
		}

		trackLen = i
		
		//gain.gain.setTargetAtTime(volume, now+.01, .05)
		gain.gain.setTargetAtTime(gain.gain.value = 0, now+(trackLen-.5)*tempo, .01)
		return node
	})

	tracks.map(node => node && node.start())

	var sound = {tracks, tempo}
		
	if(trackLen > 18) {
		gMusicStop()
		gMusic = sound
		sound.timeout = setTimeout(_ => gSoundPlay(string), trackLen*1000*tempo)
	}
	
	return sound
}

var gMusicStop = _ => {
	if(gMusic) {
		clearTimeout(gMusic.timeout)
		gMusic.tracks.map(node => node && node.stop())
	}
}

/*
var gPianoMake = (params) => {
	var tempo = 80, noteLen = .5
	var tracks = params[trackLen = 0].replace(/[\!\|]/g,'').split('\n').map(track => {
		if(!track) {
			return 0
		}
		if(track*1) { 
			track = track.split('.')
			tempo = track[0]
			noteLen = track[1]/100 || noteLen
			return 0
		}
		
		return track.split('').map((letter, i) => {
			var duration = 1,
				note = track[i-1]!='/' && letter.charCodeAt(0)
			note -= note>90 ? 71 : 65
			while(track[i+duration]=='-') {
				duration++
			}
			if(trackLen<i)trackLen=i+1
			var note2 = note
			if(track[i+duration] == '/') {
				note2 = track[i+duration+1].charCodeAt(0)
				note2 -= note2>90 ? 71 : 65
			}
			return gNoteMake(note, note2, duration*noteLen*tempo/125, 44100)
		})
	})
	
	for(var key in gPianoBuffers) {
		gBufferPlay(gPianoBuffers[key])
	}

	if(!tracks[0])tracks.shift()
	var sound = {tracks, tempo}
	return sound
}

var gNoteMake = (note1, note2, seconds, sampleRate) => {
	console.log("gNoteMake()",note1,note2,seconds)
	var key = note1+'_'+note2+seconds
	var buffer// = gPianoBuffers[key]
	if(note1>=0 && !buffer) {
		
		// Calculate frequency/pitch. "Low C" is 65.406
		note1 = 65.406 * 1.06 ** note1 / sampleRate
		note2 = 65.406 * 1.06 ** note2 / sampleRate
		
		var i = sampleRate * seconds | 0,
			sampleRest = sampleRate * (seconds - .002),
			bufferArray
		buffer = gPianoBuffers[key] = gAudioContexts[0].createBuffer(1, i, sampleRate)
		bufferArray = buffer.getChannelData(0)

		// Fill the samples array
		for(;i--;) {
			var note = note1+(note2-note1)*i/(sampleRate * seconds)
			bufferArray[i] =
				// The first 88 samples represent the note's attack
				(i < 88 ?
					i / 88.2
					// The other samples represent the rest of the note
					: (1 - (i - 88.2) / sampleRest) ** ((Math.log(1e4 * note) / 2) ** 2)
				) * gPianoify(i * note)
		}
	}
	return buffer
}
var gSoundPlay = (sound) => {
	for(var track of sound.tracks) {
		var i=0
		for(var buffer of track) {
			if(buffer) {
				gBufferPlay(buffer, i*sound.tempo)
			}
			i++
		}
	}
}
*/
	
var gCancelSound = `44
L-/R`
var gClickDownSound = `60
W/Y`
var gClickUpSound = `60
M/Y`
var gUpgradeSound = `66
NPad/f`
var gMonDieSound = `g/MdcZ---`
var gBuySound = `cdg-`
var gNoSound = `FF`
var gDrawSound = `40
M-/Z`
var gDeleteSound = `M/na/n`
var gTileUseSounds = [], gTileCancelSounds = []
for(var i=0;i<10;i++) {
	gTileUseSounds[i] = String.fromCharCode(97+i)+'/'+String.fromCharCode(98+i)
	gTileCancelSounds[i] = `80
`+String.fromCharCode(97+i)
}


/*
var gCancelSound = gSoundEffectMake([36, 30, .1])
var gClickDownSound = gSoundEffectMake([36, 30, .02])
var gClickUpSound = gSoundEffectMake([24, 36, .06])
var gUpgradeSound = gSoundEffectMake([20,25,.1, 20,30,.1], (i,len) => (i%10000<8000?-.02:.02))
var gMonDieSound = gSoundEffectMake([26, 16, .1, 46, 16, .15, 30, 26, .1], (i,len) => Math.random()*.1-(i%1000<500?1:0) )
var gBuySound = gSoundEffectMake([40, 40, .05, 45, 45, .05, 55, 55, .1])
var gNoSound = gSoundEffectMake([26, 26, .06, 26, 26, .08])
var gDrawSound = gSoundEffectMake([26, 40, .05, 40, 56, .02])
var gDeleteSound = gSoundEffectMake([46,36,.1, 36,36,.1, 26,26,.1])
*/

var gIsWord = (word) => {
	if(gWords9) {
		return gWords9.indexOf(","+word+",")>=0
	}

	var len = word.length, last = word.at(-1)
	
	// A and I are the only letter words.
	// Nothing ends in J or Q.
	if((len<2 && word!='A' && word!='I') || last=='Q' || last=='J')return
	
	// Check if the word contains any impossible 2 letter sequences.
	for(var i=0; i<len; i++) {
		var letter = word[i]
		if(letter0) {
			if(gImpossibles[letter0.charCodeAt(0)-65].indexOf(letter)>=0) {
				return
			}
		}
		var letter0 = letter
	}
	// Then if it has a vowel it's ok I guess.
	for(var i=0; i<len; i++) {
		var letter = word[i]
		if(gVowelIs(letter) || (letter=='Y' && i>0))return 1
	}
}

var gImpossibles = `
CKQX
BFGJPVWX
X

QVXZ
JKQVX
JXZ
Y
BCDFGHKLMNPQRSTVWXYZ
QVXZ

GXZ


QVXZ
ABCDEFGHJKLMNOPQRSTVXYZ

XZ
QX
W
BCDFGHJKMNPQTWXZ
QVX
DJKVXZ
QVY
CFGHJNQRWX`.split(`
`)
