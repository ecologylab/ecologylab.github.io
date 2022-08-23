package phoneemulator;
import java.util.Date;
import java.util.Random;

/**
 * @author Daniel J. Caruso
 *
 * This class extends SimplePhone and creates a thread
 * which is used to emulate a phone.
 * <br>
 * 
 * The emulator responds to incoming calls and can also 
 * initiate outgoing calls
 * <br>
 * 
 * The emulator only handel one call at time.
 */
public class SimplePhoneEmulator extends SimplePhone implements Runnable {



	private boolean runbabyrun = false;
	private Thread mythread = null;
	
	private int heartbeat = 2000; //2 seconds
	private float scprob = .10f;
	private float ecprob = .25f;
	private float ansprob = .25f;
	
	private boolean debug = true;
	
	private boolean outgoingcalls = true;

	
	private Random randomNumberGen;
	
	public SimplePhoneEmulator()
	{
		initRandom();	
	}
	
	/**
	 * Method SimplePhoneEmulator.
	 * @param responsivness
	 * Number of milliseconds of delay between AI function calls.. 
	 * This is much like heartbeat in MUDs
	 * default is 2000 (aka 2 seconds)
	 * @param startcallprob
	 * Probability that the emulator will start a call this cycle
	 * default is 10%
	 * @param endcallprob
	 * Probability that the emulator will end a ongoing call this cycle
	 * default is 25%
	 * @param answerprob
	 * Probability that the emulator will answer an incoming call this cycle
	 * default is 25%
	 */
	public SimplePhoneEmulator(int responsivness, float startcallprob, float endcallprob, float answerprob )
	{
		super();
		this.heartbeat = responsivness;
		this.scprob = startcallprob;
		this.ansprob = answerprob;
		this.ecprob = endcallprob;
		
		initRandom();
	}
	
	
	private void initRandom()
	{
		this.randomNumberGen = new Random();
		this.randomNumberGen.setSeed(new Date().getTime());
	}
	
	/**
	 * Method startEmulator.
	 * Invoke this method to start the emulator thread
	 */
	public synchronized void startEmulator()
	{
		if (this.runbabyrun == true) return;
		else 
		{
			if (debug) System.out.println("Starting thread");
			if (mythread == null) mythread = new Thread(this, "Phone Emulator");
			runbabyrun = true;
			mythread.start();
			
			if (debug) System.out.println("exting start emultor");
		}		
	}
	
	/**
	 * Method stopEmulator.
	 * Invoke this method to stop the emulator thread
	 */
	public synchronized void stopEmulator()
	{
		if (this.runbabyrun == true)
		{
			runbabyrun = false;
		}
	}

	/**
	 * @see java.lang.Runnable#run()
	 */
	public void run() {
		
		
		while (runbabyrun == true)
		{
			if (debug) System.out.println("In Run loop: state="+ this.getPhoneState());
			int state = this.getPhoneState();
			switch (state)
			{
				case (SimplePhone.RINGING) :
					{
						boolean answer = this.decideAnswer();

						if (answer)
						{							
							String from = this.getMyNumber();
							String to = this.getCurrentCallNumber();
							CallEvent evt = new CallEvent(this, CallEvent.ACCEPT, to , from);
							try
							{
								this.sendCallEvent(evt);
							}
							catch (CallException e)
							{
								//this code doesn't care but probably should give 
								//user feed back
								//System.out.println(e.getMessage());
							}
						}
						break;
					}

				case (SimplePhone.TALKING) :
					{
						if (this.decideHangUp())
						{
							String from = this.getMyNumber();
							String to = this.getCurrentCallNumber();
							CallEvent evt = new CallEvent(this, CallEvent.END, to ,from);
							try
							{
								this.sendCallEvent(evt);
							}
							catch (CallException e)
							{
								//this code doesn't care but probably should give 
								//user feed back
								//System.out.println(e.getMessage());
							}
						}
						break;
					}

				case (SimplePhone.DIALING) :
					{
						if (this.decideHangUp())
						{
							String from = this.getMyNumber();
							String to = this.getCurrentCallNumber();
							CallEvent evt = new CallEvent(this, CallEvent.END, to, from);

							try
							{
								this.sendCallEvent(evt);
							}
							catch (CallException e)
							{
								//this code doesn't care but probably should give 
								//user feed back
								//System.out.println(e.getMessage());
							}
						}
						break;
					}

				case (SimplePhone.IDLE) :
					{
						if (this.decideToCall())
						{
							String to = this.getTargetReciever().getMyNumber();
							this.setMyNumber(this.generateMyNumber());
							String from = this.getMyNumber();
							CallEvent evt = new CallEvent(this, CallEvent.BEGIN, to, from);
							try
							{
								this.sendCallEvent(evt);
							}
							catch (CallException e)
							{
								//this code doesn't care but probably should give 
								//user feed back
								//System.out.println(e.getMessage());
							}
						}
						break;
					}
					
			} //end switch

			try
			{
				Thread.sleep(this.heartbeat); //try and sleep
			}
			catch (InterruptedException e)
			{
				//stop sleeping then....
				//System.out.println("Got Interrupted");
			}
			
		}//end loop											
								
	}
	
	
	
	/**
	 * Method generateMyNumber.
	 * Randomly generates a 10 digit phone number
	 * @return String
	 */
	private String generateMyNumber()
	{
		StringBuffer sb = new StringBuffer();
		sb.append(this.randomNumberGen.nextInt(9));
		sb.append(this.randomNumberGen.nextInt(9));
		sb.append(this.randomNumberGen.nextInt(9));
		sb.append("-");
		sb.append(this.randomNumberGen.nextInt(9));
		sb.append(this.randomNumberGen.nextInt(9));
		sb.append(this.randomNumberGen.nextInt(9));
		sb.append("-");
		sb.append(this.randomNumberGen.nextInt(9));
		sb.append(this.randomNumberGen.nextInt(9));
		sb.append(this.randomNumberGen.nextInt(9));
		sb.append(this.randomNumberGen.nextInt(9));
		
		return sb.toString();		
	}


	private boolean decideAnswer() {
		
		float rand = this.randomNumberGen.nextFloat();
		if (this.ansprob > rand) return true; 
		else return false;
	}
	
	private boolean decideHangUp()
	{
		float rand = this.randomNumberGen.nextFloat();
		if (this.ecprob > rand) return true;
		else return false;
	}
	
	private boolean decideToCall()
	{
		if(this.outgoingcalls == false) return false;
		
		float rand = this.randomNumberGen.nextFloat();
		
		if (this.scprob > rand) return true;
		else return false;
	}


	
	/**
	 * Returns the ansprob.
	 * @return float
	 */
	public float getAnswerCallprob()
	{
		return ansprob;
	}

	/**
	 * Returns the ecprob.
	 * @return float
	 */
	public float getEndCallProb()
	{
		return ecprob;
	}

	/**
	 * Returns the heartbeat.
	 * @return int
	 */
	public int getHeartbeat()
	{
		return heartbeat;
	}

	/**
	 * Returns the scprob.
	 * @return float
	 */
	public float getStartCallprob()
	{
		return scprob;
	}

	/**
	 * Sets the ansprob.
	 * @param ansprob The ansprob to set
	 */
	public void setAnswerCallProb(float ansprob)
	{
		this.ansprob = ansprob;
	}


	/**
	 * Sets the ecprob.
	 * @param ecprob The ecprob to set
	 */
	public void setEndCallProb(float ecprob)
	{
		this.ecprob = ecprob;
	}

	/**
	 * Sets the heartbeat.
	 * @param heartbeat The heartbeat to set
	 */
	public void setHeartbeat(int heartbeat)
	{
		this.heartbeat = heartbeat;
	}

	/**
	 * Sets the scprob.
	 * @param scprob The scprob to set
	 */
	public void setStartCallProb(float scprob)
	{
		this.scprob = scprob;
	}

	/**
	 * Returns false if the emulator will not make outgoing calls
	 * @return boolean
	 */
	public boolean isOutgoingcalls()
	{
		return outgoingcalls;
	}

	/**
	 * Sets the outgoingcalls.
	 * passing true enables the emulator to make outgoing calls
	 * passing false disables outgoing calls.
	 * @param outgoingcalls 
	 */
	public void setOutgoingcalls(boolean outgoingcalls)
	{
		this.outgoingcalls = outgoingcalls;
	}
	
	
	void incomingCall(CallEvent evt)
    {
		this.setMyNumber(evt.getTo());
		//simple trick to make sure we are the phone being dialed
    }

}
