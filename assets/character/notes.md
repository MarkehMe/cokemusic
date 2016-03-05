Character Animation Notes
=========================
A detailed description of my thought process behind character animations, movements, events, and data. I feel like this is needed as the formatting could be difficult to someone to understand without any documention or explaination.

Character Objects
------------------------
Each base level IgeEntity object that is apart of the character. 
[Head](#head)

[Hair](#hair)

[Eyes](#eyes)

[Mouth](#mouth)

[Torso](#torso)

[Shirt](#shirt)

[Left Sleve](#l-sleve)

[Right Sleve](#r-sleve)

[Left Arm](#l-arm)

[Right Arm](#r-arm)

[Pants](#pants)

[Shoes](#shoes)


Events
------------------------
The entire character system is based off events. Which are defined as follows:

#### Main Movements ####
+ Dance
+ Drink
+ Stand
+ Sit
+ Walk

#### Facial Expressions ####
+ Angry
+ Content
+ Happy (smile)
+ Sad (frown)
+ Speaking


Events Breakdown
------------------------
As these events fire off the IgeEntity elements that need to react will be listening. The corresponding data from the ``data.js`` sheet will be executed. 

#### Dancing ####
+ Head
	+ Hair
	+ Eyes
	+ Mouth
+ Torso
	+ Shirt
	+ Sleve
	+ Left Arm 
	+ Right Arm
+ Pants
+ Shoes

#### Drinking ####
+ Torso
	+ Sleve
	+ Left Arm 
	+ Right Arm

#### Standing ####
+ Head
	+ Hair
	+ Eyes
	+ Mouth
+ Torso
	+ Shirt
	+ Sleve
	+ Left Arm 
	+ Right Arm
+ Pants
+ Shoes

#### Sitting ####
+ Torso
+ Pants
+ Shoes

#### Walking ####
+ Head
	+ Hair
	+ Eyes
	+ Mouth
+ Torso
	+ Shirt
	+ Sleve
	+ Left Arm 
	+ Right Arm
+ Pants
+ Shoes

#### Facial Expressions ####
+ Head
	+ Eyes
	+ Mouth


Object Breakdown
------------------------
Each object of the character broken down with event information and general information.

#### Head <a name="head"></a> ####
The characters head. At the base level the head does not have hair, eyes, or mouth.

**Children**
+ Hair
+ Eyes
+ Mouth

**Events**
+ Dancing
+ Standing
+ Waking

#### Hair <a name="hair"></a> ####
The characters hair that is a child element of ``head``.

**Events**
+ Dancing
+ Standing
+ Walking

#### Eyes <a name="eyes"></a> ####
The characters eyes that are a child element of ``head``. They play a key role in showcasing emotions i.e. facial expressions.

**Events**
+ Dancing
+ Standing
+ Walking
+ Facial Expressions

#### Mouth <a name="mouth"></a> ####
The characters mouth that is a child element of ``head``. The mouth also plays a key role in showcasing emotions i.e. facial expressions.

**Events**
+ Dancing
+ Standing
+ Walking
+ Facial Expressions

#### Torso <a name="torso"></a> ####
The characters torso. It is involved in every event that is causing the character to change direction ``x,y``.

**Children**
+ Shirt
+ Left Sleve
+ Right Sleve
+ Left Arm 
+ Right Arm

**Events**
+ Dancing
+ Drinking
+ Standing
+ Sitting
+ Waking

#### Shirt <a name="shirt"></a> ####
The characters shirt that is a child element of ``torso``. The shirt goes ontop of the torso in the depth sorting.

**Events**
+ Dancing
+ Standing
+ Sitting
+ Walking

#### Left Sleve <a name="l-sleve"></a> ####
The characters left sleve that is a child element of ``torso``. The Sleve goes ontop of the left arm in the depth sorting. 

**Events**
+ Dancing
+ Standing
+ Sitting
+ Walking

#### Right Sleve <a name="r-sleve"></a> ####
The characters right sleve that is a child element of ``torso``. The Sleve goes ontop of the right arm in the depth sorting. Is apart of the drinking event (right hand goes up to "sip" the drink)

**Events**
+ Dancing
+ Drinking
+ Standing
+ Sitting
+ Walking

#### Left Arm <a name="l-arm"></a> ####
The characters left arm that is a child element of ``torso``.

**Events**
+ Dancing
+ Standing
+ Sitting
+ Walking

#### Right Arm <a name="r-arm"></a> ####
The characters right sleve that is a child element of ``torso``. Is apart of the drinking event (right hand goes up to "sip" the drink)

**Events**
+ Dancing
+ Drinking
+ Standing
+ Sitting
+ Walking

#### Pants <a name="pants"></a> ####
The characters pants.

**Events**
+ Dancing
+ Standing
+ Sitting
+ Walking

#### Shoes <a name="shoes"></a> ####
The characters shoes.

**Events**
+ Dancing
+ Standing
+ Sitting
+ Walking




